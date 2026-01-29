# Setup Guide - Windows

Follow these steps to get Livest running on your Windows machine.

## Prerequisites
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

## Step 1: Clone the Project
Open **PowerShell** or **Command Prompt** and run:
```bash
git clone <your-repository-url>
cd livest-project
```

## Step 2: Install Development Server
Since this project uses ES Modules directly in the browser, you just need a simple static server. We recommend the VS Code **Live Server** extension:
1. Open VS Code.
2. Go to Extensions (`Ctrl+Shift+X`).
3. Search for "Live Server" by Ritwick Dey and install it.

## Step 3: Run the App
1. Right-click on `index.html` in the VS Code explorer.
2. Select **"Open with Live Server"**.
3. Your browser will automatically open `http://127.0.0.1:5500`.

## (Optional) Python Backend Setup
If you are developing the ML API:
1. Install Python from the Microsoft Store or Python.org.
2. Run `python -m venv venv`.
3. Run `.\venv\Scripts\activate`.
4. Run `pip install -r requirements.txt`.
