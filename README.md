
<div align="center">
 <h1>LocalDrop 🌐</h1>
</div>

A lightweight, local-network file-sharing web application inspired by tools like LocalDrop and LocalSend. It allows devices connected to the same Wi-Fi network to automatically discover each other in real-time, customize their device names, and securely transfer files directly browser-to-browser (P2P) without needing an active internet connection.

---

## ✨ Features

- **Automatic Local Discovery:** Instantly lists all devices currently connected to the web page on your local network using WebSockets.
- **Peer-to-Peer (P2P) File Transfer:** Files are streamed directly between devices using WebRTC Data Channels (no server file-upload bottlenecks).
- **Random Codenames:** Automatically generates fun default names (e.g., *Cosmic Panda 42*) on first visit and persists them using `localStorage`.
- **Customizable Identity:** Users can easily rename their device or roll a new random codename on the fly.
- **Responsive & Modern UI:** Built with Tailwind CSS for a sleek, dark-mode-first aesthetic.
---
**Device 1 - Desktop**
<div align="center">  
<img src="https://github.com/Wilfred1097/LocalDrop/blob/main/images/image1.PNG?raw=true" alt="Device 1" width="100%"> </div>


**Device 2 - Mobile**
<div align="center"> <img src="https://github.com/Wilfred1097/LocalDrop/blob/main/images/image2.png?raw=true" alt="Device 1" width="100%"> </div>

---
## 🛠️ Tech Stack

- **Backend:** Node.js, Express, Socket.io
- **Frontend:** HTML5, Tailwind CSS, WebRTC, JavaScript

---

## 🚀 Installation & Running Guide
Follow these steps to set up and run LocalDrop on your local machine:

### Prerequisites
Make sure you have **Node.js** installed on your computer. (You can check by running `node -v` in your terminal).

### Step 1: Clone or Set Up Project Files
Ensure your project folder structure looks like this:
```text
local-drop/
├── public/
│   └── index.html
├── package.json
└── server.js
```
### Step 2: Install Dependencies
Open your terminal, navigate to your project directory, and run:

```Bash
	 npm install
```

### Step 3: Start the Server

Start the application server by running:
```Bash
	node server.js
```
*(Alternatively, if configured in your `package.json`, you can run `npm start`)*
once running, the console will display URLs similar to this:
```Plaintext
	🚀 LocalDrop server running!
	> Open on this machine: http://localhost:3000
	> Open on other network devices: [http://192.168.](http://192.168.)X.X:3000
```

### Step 4: Access and Test on Your Network
1.   **On your computer:** Open `http://localhost:3000` in your browser.
    
2.   **On other devices (Phones, Tablets, Laptops):** Connect them to the **same Wi-Fi network** and type the network URL provided in your terminal (e.g., `http://192.168.1.15:3000`) into their browser.
    
3.   You will see devices populate on the screen, ready to send files to one another!
---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---
<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/wilfred1097">wilfred1097</a></sub>
</div>