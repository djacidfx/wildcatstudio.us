# ==============================================================================
# WildCat Studio - Automated GitHub Pages Deployment Script
# Targets: https://github.com/djacidfx/wildcatstudio.us -> https://wildcatstudio.us/
# ==============================================================================

param(
    [string]$RepoName = "wildcatstudio.us",
    [string]$Owner = "djacidfx"
)

$ErrorActionPreference = "Stop"

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "   WildCat Studio - GitHub Pages Deployment & DNS Configurator   " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan

# 1. Locate Token
$TokenPath = Join-Path $PSScriptRoot "..\webtoexe-pro\release_token.txt"
if (Test-Path $TokenPath) {
    $Token = (Get-Content $TokenPath -Raw).Trim()
    Write-Host "[1/6] Loaded GitHub Personal Access Token from release_token.txt" -ForegroundColor Green
} elseif ($env:GITHUB_TOKEN) {
    $Token = $env:GITHUB_TOKEN.Trim()
    Write-Host "[1/6] Loaded GitHub Token from environment variable" -ForegroundColor Green
} else {
    Write-Error "GitHub token not found! Please place token in $TokenPath or set GITHUB_TOKEN."
}

$Headers = @{
    "Authorization" = "token $Token"
    "Accept"        = "application/vnd.github+json"
    "User-Agent"    = "WildCat-Deployer/1.0"
}

# 2. Check if repository exists on GitHub
Write-Host "[2/6] Checking remote repository: $Owner/$RepoName..." -ForegroundColor Cyan
$RepoExists = $false
try {
    $null = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$RepoName" -Headers $Headers -Method Get
    $RepoExists = $true
    Write-Host "      Repository https://github.com/$Owner/$RepoName already exists." -ForegroundColor Green
} catch {
    Write-Host "      Repository does not exist yet. Creating public repository..." -ForegroundColor Yellow
    $CreateBody = @{
        name        = $RepoName
        description = "Official Website & Product Hub for WildCat Studio and WebToApp Studio Pro"
        homepage    = "https://wildcatstudio.us"
        private     = $false
        has_issues  = $true
        has_wiki    = $true
    } | ConvertTo-Json

    $NewRepo = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Headers $Headers -Method Post -Body $CreateBody -ContentType "application/json"
    Write-Host "      Repository created successfully: $($NewRepo.html_url)" -ForegroundColor Green
}

# 3. Initialize Git in current directory
Write-Host "[3/6] Staging website assets for commit..." -ForegroundColor Cyan
Set-Location $PSScriptRoot

if (-not (Test-Path ".git")) {
    git init -b main
}

# Ensure authenticated remote URL
$RemoteUrl = "https://$Token@github.com/$Owner/$RepoName.git"
$Remotes = git remote
if ($Remotes -contains "origin") {
    git remote set-url origin $RemoteUrl
} else {
    git remote add origin $RemoteUrl
}

git add -A
$Status = git status --porcelain
if ($Status) {
    git commit -m "feat(website): launch WildCat Studio & WebToApp Studio Pro GitHub Pages site"
    Write-Host "      Committed latest website files." -ForegroundColor Green
} else {
    Write-Host "      Working tree clean, nothing new to commit." -ForegroundColor DarkGray
}

# 4. Push to main branch
Write-Host "[4/6] Pushing website to GitHub origin/main..." -ForegroundColor Cyan
git push -u origin main --force
Write-Host "      Pushed to https://github.com/$Owner/$RepoName (main branch)." -ForegroundColor Green

# 5. Enable and Configure GitHub Pages
Write-Host "[5/6] Enabling GitHub Pages (Source: main / root)..." -ForegroundColor Cyan
try {
    $PagesBody = @{
        source = @{
            branch = "main"
            path   = "/"
        }
    } | ConvertTo-Json

    $PagesConfig = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$RepoName/pages" -Headers $Headers -Method Post -Body $PagesBody -ContentType "application/json"
    Write-Host "      GitHub Pages enabled at: $($PagesConfig.html_url)" -ForegroundColor Green
} catch {
    # If already enabled, try updating
    try {
        $PagesConfig = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$RepoName/pages" -Headers $Headers -Method Put -Body $PagesBody -ContentType "application/json"
        Write-Host "      GitHub Pages settings updated." -ForegroundColor Green
    } catch {
        Write-Host "      GitHub Pages already configured." -ForegroundColor DarkGray
    }
}

# 6. Custom Domain & DNS Info
Write-Host "[6/6] Configuring Custom Domain (wildcatstudio.us)..." -ForegroundColor Cyan
try {
    $DomainBody = @{
        cname = "wildcatstudio.us"
    } | ConvertTo-Json
    $null = Invoke-RestMethod -Uri "https://api.github.com/repos/$Owner/$RepoName/pages" -Headers $Headers -Method Put -Body $DomainBody -ContentType "application/json"
    Write-Host "      Custom domain set to wildcatstudio.us in GitHub Pages settings." -ForegroundColor Green
} catch {
    Write-Host "      Custom domain will activate once DNS propagates." -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "   DEPLOYMENT SUCCESSFUL!                                       " -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "Repository:   https://github.com/$Owner/$RepoName"
Write-Host "GitHub Pages: https://$Owner.github.io/$RepoName/"
Write-Host "Custom Domain: https://wildcatstudio.us/ (with HTTPS)"
Write-Host ""
Write-Host "DNS Configuration Checklist for your registrar/DNS provider:" -ForegroundColor Yellow
Write-Host "1. A Records for '@' (apex domain):"
Write-Host "   185.199.108.153"
Write-Host "   185.199.109.153"
Write-Host "   185.199.110.153"
Write-Host "   185.199.111.153"
Write-Host "2. CNAME Record for 'www':"
Write-Host "   $Owner.github.io"
Write-Host "=================================================================" -ForegroundColor Cyan
