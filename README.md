<div align="center">
  <h1>🌿 AgroTech <br/> 
  <span style="font-size: 0.6em; color: gray;">Connecting Farmers and Middlemen</span></h1>

  <p>
    AgroTech is a modern, full-stack digital marketplace designed to bridge the gap between agricultural producers and wholesale distributors. By providing real-time demand comparisons, region-specific price trends, and direct purchase channels, the platform empowers farmers to optimally price their crops and negotiate fair deals, eliminating excessive intermediary layers.
  </p>

  <p>
    <strong>Live Demo:</strong> <a href="https://resumeagrotech.vercel.app">https://resumeagrotech.vercel.app</a><br/>
    <strong>GitHub Repository:</strong> <a href="https://github.com/Shreyanshjain3725/AgroTech">Shreyanshjain3725/AgroTech</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node JS" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </p>
</div>

<hr />

## 📖 Table of Contents
- [📸 Application Screenshots](#-application-screenshot-tour)
- [🚀 Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Directory Structure](#-project-directory-structure)
- [⚙️ Quick Start Installation](#️-quick-start-installation--setup)
- [👤 Verification Credentials](#-verification-credentials)
- [☁️ Deploying to Vercel](#️-deploying-to-vercel)

---

## 📸 Application Screenshot Tour

Take a glimpse into the AgroTech application interfaces. 

| Farmer Dashboard | Market Demographics |
| :---: | :---: |
| <img src="Dashboard.png" alt="Farmer Dashboard" width="400"/> | <img src="Demographics.png" alt="Demographics" width="400"/> |
| *Action hub showing real-time market opportunities.* | *Interactive stats to visualize regional crop demand.* |

| Purchase Requests | User Profile & Preferences |
| :---: | :---: |
| <img src="Purchase_Request.png" alt="Purchase Request Sheet" width="400"/> | <img src="Profile_Page.png" alt="User Profile" width="400"/> |
| *Middlemen requirements and crop offers.* | *Manage business profiles, credentials, and crops.* |

<details>
<summary><b>👉 Click to view Brand Footer</b></summary>
<br>
<img src="Footer.png" alt="Brand Footer" width="800"/>
</details>

---

## 🚀 Key Features

*   🌱 **Dual Portal Authentication**: Specialized registration and separate UI flows for **Farmers** (sellers) and **Middlemen** (buyers).
*   🔒 **Simple Authentication**: Secured via robust Basic Authentication matching bcrypted database credentials.
*   🛒 **Market Request Hub**: Middlemen can publish exact purchase requests. Farmers review these listings and fulfill them.
*   📊 **Demographic Visualizers**: Interactive Chart.js graphs documenting crop production shares, regional demands, and price curves.
*   🛠️ **AgriSmart Tools**: Modern utility widgets that help farmers plan optimal crop yields based on climate and market conditions.
*   📦 **Self-Contained Dev Database**: Features an embedded In-Memory MongoDB Runner for frictionless development without installing local binaries.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 (React-Router-DOM v7)
- **Styling**: TailwindCSS v4, Bootstrap v5 (Vanilla CSS components)
- **Charts / Graphics**: Chart.js, React-Chartjs-2
- **Network Client**: Axios
- **Design Icons**: Lucide React

### **Backend**
- **Server Framework**: Node.js & Express.js
- **Database driver**: Mongoose (MongoDB)
- **Security**: Bcrypt.js (Password Hashing)
- **Utility Tools**: Nodemon, Dotenv, Multer

---

## 📂 Project Directory Structure

```text
agrotech/
├── agrotech-frontend/    # React frontend client application
│   ├── src/             # Application source files (pages, components, context, etc.)
│   └── package.json     # Client-side configuration and scripts
├── server/               # Express & Node.js backend server
│   ├── src/             # Backend server routes, models, middleware, and entrypoints
│   ├── run-db.js        # Helper script to launch In-Memory MongoDB server
│   └── package.json     # Server-side configuration and script actions
└── backend/              # Alternate Java Spring Boot backend folder
```

---

## ⚙️ Quick Start Installation & Setup

Follow these steps to launch the entire stack on your local workspace.

> [!NOTE]
> **Core Requirements:** Make sure you have **Node.js v18+** and **NPM v9+** installed on your system.

### **Step 1: Start the In-Memory MongoDB Server**
To make frontend development and backend testing completely zero-configuration, we have packaged an in-memory database server.
```bash
cd server
npm install
npm run db
```
*(The database will start listening on port `27017` in the background.)*

### **Step 2: Launch the Backend Express API**
Open a new terminal window to spin up the API application.
```bash
cd server
npm start
```
*(The API will start listening and connect to the database at `http://localhost:5000`.)*

### **Step 3: Launch the React Client App**
Open a third terminal window for the React frontend application.
```bash
cd agrotech-frontend
npm install
npm start
```
*(Your default web browser should open automatically displaying the application at `http://localhost:3000`.)*

---

## 👤 Verification Credentials

You can register new Farmers/Middlemen directly in the registration pages, or use our pre-configured test account for immediate access:

- **Role**: `Farmer`
- **Username**: `farmer1`
- **Password**: `Password123`

---

## ☁️ Deploying to Vercel

When deploying to **Vercel** serverless functions, the local in-memory MongoDB will not be available. You must connect to a cloud provider:

1. Connect to a Cloud MongoDB cluster (like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).
2. Go to your project settings in Vercel.
3. Add a new **Environment Variable** named `MONGODB_URI`.
4. Set the value to your new MongoDB connection string (e.g., `mongodb+srv://<user>:<password>@cluster/agrotech`).
5. **Redeploy** your project. This is strictly required for Login and Signup to function properly in the production build.
