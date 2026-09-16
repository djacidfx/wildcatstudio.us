# 🛠️ Devlog #1: $0 Microsoft Store Code Signing, Native Linux Edition, and 100% Clean Anti-Malware Automation

**Post Type**: Public or Patron-Only Update  
**Estimated Reading Time**: 4 minutes  

---

Hey everyone! 👋 Welcome to our very first official development log for **WebToApp Studio Pro**!

Over the past few weeks, we've tackled some of the biggest, most stubborn pain points in desktop software distribution: the astronomical costs of commercial code signing certificates, the bloat of traditional web wrappers, and the friction of publishing across multiple operating systems.

Here is a look behind the scenes at what we just shipped in **v1.1.9**, how the engineering works, and where we're heading next!

---

## 🏬 1. Cracking the Code Signing Tax ($0 Microsoft Store Workflow)

If you've ever built a standalone Windows application, you’ve likely hit the **"Code Signing Wall"**.

Windows SmartScreen actively blocks and scares users away from unsigned `.exe` files with a bright blue *"Windows protected your PC"* banner. To get rid of that warning, developers are expected to purchase a Commercial Extended Validation (EV) certificate that costs **$300 to $500+ every single year**. For indie developers, hobbyists, and small creators, this is an unreasonable barrier to entry.

In **v1.1.9**, we solved this by implementing a complete **Microsoft Store (MSIX) Packaging Engine**:

### How It Works:
1. **Automated Store Packaging**: WebToApp Studio now bundles your web apps and games into modern Windows 10 & 11 `.msix` containers with a single click.
2. **Auto-Scaled Tile Assets**: It dynamically generates all 5 required scaled Windows visual assets (`StoreLogo`, `Square150x150`, `Square44x44`, `Wide310x150`, and `SplashScreen`) so your app looks native on Windows Start Menus and taskbars.
3. **The $0 Secret**: When you upload an `.msix` to the Microsoft Partner Center ($19 one-time account fee), **Microsoft automatically signs your package with their globally trusted root certificate for free**. No annual certificate subscription, no SmartScreen warnings, and automatic silent background updates through Windows Update!
4. **Local Sideloading**: To let you test your app on your own computer before uploading to the Store, we built an internal RSA-2048 certificate generator into .NET 8 that outputs a 1-click PowerShell installer (`Install-TestCertificate.ps1`) to trust your build locally.

---

## 🐧 2. WebToApp Studio Goes Native on Ubuntu & Linux

One of our most requested features was: *"Can I run WebToApp Studio on Linux so I can create apps directly from Ubuntu?"*

We didn't want to create an Electron wrapper that takes 200 MB of disk space just to render a UI. Instead, we architected **`WebToExe.Studio.Linux`**:
* **Powered by WebKitGTK & Photino**: It interfaces directly with native Linux GTK3 and WebKit libraries.
* **100x Lighter Than Electron**: The entire Linux Studio runtime weighs just **~1.3 MB**, consuming a fraction of the RAM of standard wrappers.
* **Pure C# Debian Compiler**: On the backend, we wrote a native Unix `ar` and tarball generator in pure C#. That means our engine can compile valid Ubuntu `.deb` installers and portable Linux `.tar.gz` archives with **zero external dependencies** — no Docker, no WSL, and no virtual machines required!

---

## 🛡️ 3. Automated 70+ Engine Anti-Malware Verification

Trust is everything when downloading software. Unfortunately, brand-new executables and indie developer tools often get hit by generic "false positive" heuristics from overzealous antivirus scanners.

To ensure our users and customers have 100% peace of mind, we built an automated **VirusTotal Multi-Engine Scanner** directly into our release pipeline:

```text
==================================================
   WebToApp Studio Pro - Release Security Audit
==================================================
--> WebToApp-Studio-v1.1.9.zip:                   0 / 67 Engines Clean (100% Clean)
--> WebToApp-Studio-Pro_1.1.9_amd64.deb:          0 / 61 Engines Clean (100% Clean)
--> WebToApp-Studio-Pro-Linux-x64-Portable.tar.gz: 0 / 62 Engines Clean (100% Clean)
```

Every single release build is cryptographically hashed with SHA-256 and scanned against 60+ to 70+ top security engines (Microsoft Defender, Kaspersky, Sophos, Avast, BitDefender, etc.). The script automatically updates our GitHub release notes and README with live, permanent verification permalinks so anyone can independently verify the safety of our binaries.

---

## 🚀 4. Packaging WebToApp Studio Itself for the Store

To prove how powerful our new MSIX engine is, we used it to package **WebToApp Studio Pro itself** into a Microsoft Store package!

Using our newly created `package_store_studio.ps1` pipeline, the entire studio — including its WebView2 UI, project templates, and multi-platform compilers — compresses into a single **1.81 MB `.msix` installer**. We've written a step-by-step submission guide and are preparing our submission for the official Microsoft Store!

---

## 🗺️ What We're Working on Next

Here's a sneak peek at what's currently on the workbench:
* 🍎 **macOS Export Research**: Investigating lightweight native WebKit bundling for `.app` and `.dmg` generation.
* 🎨 **Integrated Icon Studio**: An in-app utility to take a single square PNG or SVG and automatically produce every required icon size for Windows `.ico`, Android mipmap folders, Store tiles, and Linux hicolor directories.
* ☁️ **Cloud Companion & Web Builder**: Exploring a cloud-based build companion for developers working on Chromebooks and iPads.

---

### Join the Conversation! 💬

What platform do you build for most — Windows, Android, Linux, or the Microsoft Store? What's one feature that would speed up your workflow the most?

Drop a comment below — I read and respond to every single post. Thank you so much for being a part of this journey!

— **Wildcat Studio**  
*Creator of WebToApp Studio Pro*
