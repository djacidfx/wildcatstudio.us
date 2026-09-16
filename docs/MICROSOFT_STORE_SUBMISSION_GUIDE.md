# Microsoft Store (MSIX) Submission & Publishing Guide 🏬

This guide walks you through submitting **WebToApp Studio Pro** (or any application generated with it) to the **Microsoft Store** using Windows 10 & 11 `.msix` packages.

---

## 🌟 The $0 Code Signing Advantage

Normally, distributing standalone Windows software requires purchasing an expensive **Commercial Extended Validation (EV) Code Signing Certificate** ($300 to $500+ every single year) to prevent Windows SmartScreen from displaying *"Windows protected your PC"* warnings.

When publishing to the **Microsoft Store**:
* **$0 Code Signing Cost**: When you submit your `.msix` package to Microsoft Partner Center, Microsoft's ingestion pipeline **automatically digitally signs your application with Microsoft's globally trusted root certificate for free**.
* **Zero SmartScreen Warnings**: Users installing your app from the Microsoft Store will never see untrusted warnings.
* **Automatic Background Updates**: Windows Update handles silent background updates for your users whenever you release a new package.
* **One-Time Account Fee**: Microsoft Partner Center charges a **one-time fee of $19 USD** for an individual account (or $99 for corporate) — with **no recurring annual subscriptions**.

---

## 🧪 Part 1: Immediate Local Sideload Testing

Before submitting to the Store, you can install and test your `.msix` package locally on your own Windows 10 or 11 computer in seconds.

### Step 1: Open the Store Distribution Folder
Navigate to:
```text
C:\Users\djaci\.gemini\antigravity\scratch\webtoexe-pro\dist\store
```

You will see:
* `WebToApp-Studio-Pro-v1.1.9-Store-x64.msix` (The production Store package)
* `Install-TestCertificate.ps1` (Automated 1-click certificate trust installer)
* `WebToApp_TestSigning.cer` (Public test signing certificate)

### Step 2: Install the Test Certificate
Windows requires any sideloaded `.msix` to be signed by a trusted certificate on the machine:
1. Open PowerShell as **Administrator**.
2. Run:
   ```powershell
   cd "C:\Users\djaci\.gemini\antigravity\scratch\webtoexe-pro\dist\store"
   .\Install-TestCertificate.ps1
   ```
   *(This safely adds `WebToApp_TestSigning.cer` to `Cert:\LocalMachine\TrustedPeople` so Windows recognizes your local test build).*

### Step 3: Launch & Install the MSIX
1. Double-click `WebToApp-Studio-Pro-v1.1.9-Store-x64.msix`.
2. The native **Windows App Installer** dialog will appear displaying the official app icon, name, and capabilities.
3. Click **Install**.
4. Launch **WebToApp Studio Pro** directly from your Windows Start Menu!

---

## 🚀 Part 2: Microsoft Partner Center Submission

Follow these steps to submit your package to the official Microsoft Store:

### Step 1: Sign in to Microsoft Partner Center
1. Go to [Microsoft Partner Center](https://partner.microsoft.com/dashboard/apps-and-games/overview).
2. Sign in with your Microsoft Account (or register for $19 USD if you don't already have a developer account).

### Step 2: Reserve Your App Name
1. On the dashboard, click **Create a new product** -> **MSIX or PWA app**.
2. Enter your desired app name (e.g. `WebToApp Studio Pro`).
3. Click **Reserve product name**.

### Step 3: Retrieve Your Product Identity
Microsoft assigns unique identity values to your reserved app:
1. In your app's menu on the left, navigate to **Product management** -> **Product Identity**.
2. Note the three values:
   * **Package/Identity Name**: (e.g., `12345WildcatStudio.WebToAppStudioPro`)
   * **Publisher ID**: (e.g., `CN=938E4211-1234-ABCD-5678-0123456789AB`)
   * **Publisher Display Name**: (e.g., `Wildcat Studio`)

### Step 4: Re-package with Your Exact Store Identity
Run the packaging script with your Partner Center parameters:
```powershell
cd "C:\Users\djaci\.gemini\antigravity\scratch\webtoexe-pro"

.\package_store_studio.ps1 `
    -PackageName "Your_Partner_Center_Package_Name" `
    -PublisherId "CN=Your_Partner_Center_Publisher_ID" `
    -PublisherDisplayName "Your_Partner_Center_Publisher_Display_Name"
```

This compiles your customized `.msix` with the exact XML manifest identity required by Microsoft's automated ingestion checks.

---

### Step 5: Start a Submission
1. In Partner Center under your app, click **Start your submission**.
2. Configure the submission sections:

#### A. Pricing and Availability
* **Price**: Select *Free* (or your desired purchase price).
* **Markets**: Select *All markets* (or specific countries).

#### B. Properties
* **Category**: *Developer Tools* or *Utilities*.
* **Privacy Policy URL**: Link to your privacy policy or GitHub wiki page.

#### C. Age Ratings
* Complete the short questionnaire (standard utility apps are rated All Ages / 3+).

#### D. Packages
* Drag and drop `dist\store\WebToApp-Studio-Pro-v1.1.9-Store-x64.msix`.
* Partner Center will parse the package, validate the visual assets and manifest, and verify device compatibility (`Windows.Desktop` x64).

#### E. Store Listings
* **Language**: English (United States)
* **Description**:
  > *Convert Websites & HTML5 projects into standalone Windows .exe, Microsoft Store (MSIX), Google Play Android apps, and Ubuntu Linux packages.*
* **Search Terms / Keywords**:
  > `web to desktop`, `webview2`, `html5`, `android`, `ubuntu`, `wrapper`, `packaging`
* **Screenshots**: Upload 1 to 4 screenshots of WebToApp Studio Pro.

---

### Step 6: Submit to the Store
1. Click **Submit to the Store**.
2. Microsoft's automated certification and manual review process begins.
3. Review typically takes between **24 to 48 hours**.
4. Once approved, **WebToApp Studio Pro** will be live on the Microsoft Store worldwide!

---

## 🔄 Releasing Updates in the Future

When you release a new version (e.g., v1.2.0):
1. Update `"latestVersion": "1.2.0"` in `src/WebToExe.Studio/version.json`.
2. Run `.\package_store_studio.ps1`.
3. In Microsoft Partner Center, click **Update** under your app and upload the new `.msix`.
4. Windows Update will automatically push the update to all existing users without requiring manual downloads.
