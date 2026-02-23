# Video Call and Chat Application

A high-performance, real-time video conferencing application built with React, Vite, and ZegoCloud.

## 🚀 Features

- **Real-time Video Calls**: High-quality 1-on-1 and group video conferencing.
- **Instant Join**: Join any room with a simple unique Room ID.
- **Screen Sharing**: Effortlessly share your screen during calls.
- **Responsive Design**: Polished UI with a modern, glassmorphic aesthetic.
- **Stable Lifecycle**: Robust component management using React hooks (`useEffect`, `useRef`).

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Routing**: React Router 7
- **Video Engine**: ZegoCloud UIKits
- **Styling**: Vanilla CSS

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed on your machine.
- A ZegoCloud account (get your App ID and Server Secret from the [ZegoCloud Admin Console](https://console.zegocloud.com/)).

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your ZegoCloud credentials:
```env
VITE_ZEGO_APP_ID=your_app_id_here
VITE_ZEGO_SERVER_SECRET=your_server_secret_here
```

### 4. Run Locally
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 🛡️ Best Practices
- **Security**: Credentials are managed via environment variables and should never be committed to version control.
- **Performance**: Built with Vite for lightning-fast development and optimized production bundles.

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
