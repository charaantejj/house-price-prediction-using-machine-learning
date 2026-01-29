# Setup Guide - macOS

Follow these steps to get Livest running on your Mac.

## Prerequisites
- **Homebrew**: (Optional, but recommended) `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- **Node.js**: `brew install node`
- **Git**: `brew install git`

## Step 1: Clone the Project
Open **Terminal** and run:
```bash
git clone <your-repository-url>
cd livest-project
```

## Step 2: Launch the App
You can use the built-in Python server or Node.js `serve` package.

### Option A: Node.js (Recommended)
```bash
npx serve .
```
Then open `http://localhost:3000`.

### Option B: Python (Built-in)
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Step 3: Development
Open the folder in VS Code:
```bash
code .
```

## (Optional) Python Backend Setup
If you are developing the ML API:
1. `python3 -m venv venv`
2. `source venv/bin/activate`
3. `pip install -r requirements.txt`
4. `uvicorn main:app --reload`
