<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=300&section=header&text=MedChain%20AI&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Next-Generation%20Blockchain%20&%20AI%20Healthcare&descAlignY=51&descAlign=62" alt="MedChain AI Header" />

<!-- Typing Animated Subtitle -->
<a href="https://github.com/SaiyamJain468/Medchain-AI">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=00F0FF&center=true&vCenter=true&width=600&lines=Anti-Counterfeit+Medicine+Tracking;AI-Powered+Fraud+Detection;Decentralized+Supply+Chain;Secure+Patient+Records" alt="Typing SVG" />
</a>

<br/>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" alt="Solidity" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
</p>

<h3>Revolutionizing Healthcare Supply Chains with Blockchain & Artificial Intelligence.</h3>

</div>

---

## 🚀 Overview

**MedChain AI** is a state-of-the-art decentralized application built to tackle counterfeit drugs and streamline the medical supply chain. By integrating robust **Polygon Blockchain** smart contracts with a **FastAPI-powered Python AI Microservice** and a sleek **Next.js 14** web interface, MedChain AI delivers unprecedented transparency, immutability, and intelligence to the pharmaceutical industry.

<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## ✨ Key Features

- 🔐 **Role-Based Authentication**: Secure login via NextAuth.js for Patients, Pharmacists, and Admins.
- 💊 **Medicine Scanner**: Real-time barcode & image recognition via an AI microservice and WebRTC.
- ⛓️ **Blockchain Immutability**: Drug batches are registered on the Polygon Testnet through Solidity smart contracts.
- 🗺️ **Fraud Detection Heatmap**: Interactive map visualizing suspected counterfeit incidents using Mapbox GL JS.
- 🛒 **Decentralized Marketplace**: Browse, verify, and trace the history of medical supplies seamlessly.
- 🎨 **Premium UI/UX**: A dark-themed, glassmorphic design utilizing Tailwind CSS for an optimal user experience.

<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 🏗️ Technical Architecture

```mermaid
graph TD;
    A[Next.js 14 Frontend] -->|API Routes| B(NextAuth & Node Backend);
    B -->|Mongoose| C[(MongoDB Database)];
    A -->|Image Data| D[FastAPI Python Microservice];
    D -->|AI Recognition| A;
    A -->|Web3.js / Ethers.js| E{Polygon Blockchain};
    E -->|Smart Contracts| F[Drug Batch Registry];
```

<br/>

## 💻 Installation & Setup

Follow these steps to run **MedChain AI** locally:

### 1. Clone the Repository
```bash
git clone https://github.com/SaiyamJain468/Medchain-AI.git
cd Medchain-AI
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the necessary tokens:
```env
NEXTAUTH_SECRET=your_secret_here
MONGODB_URI=your_mongodb_connection_string
MAPBOX_ACCESS_TOKEN=your_mapbox_token
NEXT_PUBLIC_POLYGON_RPC_URL=your_polygon_testnet_rpc
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 🤝 Contributing

We welcome contributions to make **MedChain AI** even better! 
Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.
Before you contribute, ensure you read our [Code of Conduct](CODE_OF_CONDUCT.md).

<br/>

## 📜 License

This project is licensed under a **Proprietary License** - see the [LICENSE](LICENSE) file for details. 
Copyright (c) 2026 Saiyam Jain

<br/>

---
<div align="center">
  <i>Developed with ❤️ by <a href="https://github.com/SaiyamJain468">Saiyam Jain</a></i><br>
  <img src="https://forthebadge.com/images/badges/built-with-love.svg" />
</div>
