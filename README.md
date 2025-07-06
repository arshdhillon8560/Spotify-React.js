# Spotify-React.js

[User App](https://spotify-react-js-9rho.vercel.app/) | [Admin Dashboard](https://spotify-admin-blond.vercel.app/)

---

# Spotify Clone Full Stack Project 🎧

This project is a full-stack **Spotify-inspired music streaming platform** built with React.js, Node.js (Express), and MongoDB. It includes:

- 🎵 A responsive **User Spotify App**
- 🎛️ A separate **Admin Dashboard** for managing songs & albums
- 🧠 A **Backend API** built with Express.js and MongoDB

---

## 🗂️ Project Structure

```
Spotify-React.js/
│
├── client/   # Frontend Spotify app (React.js + Tailwind CSS)
├── admin/    # Admin dashboard to manage songs & albums
└── backend/  # Node.js/Express.js REST API + MongoDB
```

---

## 🧑‍🎤 Features

### 🎧 Spotify App (User)
- Browse albums and songs
- Play/Pause/Next/Previous with seekbar
- Volume control & mute toggle
- Responsive layout with mobile-first design
- Song durations and metadata
- Real-time player updates

### 🛠️ Admin Dashboard
- Add, update or delete songs and albums
- Upload cover images and song files
- Realtime sync with user app
- Auth optional (can be extended)

### ⚙️ Backend API (Express.js)
- RESTful routes for:
    - Songs (`/api/song`)
    - Albums (`/api/album`)
- MongoDB for persistent storage
- Multer for file upload
- CORS-enabled for cross-origin access

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/arshdhillon8560/Spotify-React.js.git
cd Spotify-React.js
```

### 2. Install Dependencies

Install dependencies for each part (client, admin, backend):

```bash
cd client
npm install
cd ../admin
npm install
cd ../backend
npm install
```

### 3. Set Up Environment Variables

- Create a `.env` file in the `backend` directory with your MongoDB URI, Cloudinary credentials, and other secrets.

### 4. Run the Backend

```bash
cd backend
npm start
```

### 5. Run the Frontend (User App)

```bash
cd client
npm start
```

### 6. Run the Admin Dashboard

```bash
cd admin
npm start
```

---

## 🌩️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Multer, Cloudinary
- **Deployment:** Vercel

---

## 📦 Deployment Links

- **User App:** [https://spotify-react-js-9rho.vercel.app/](https://spotify-react-js-9rho.vercel.app/)
- **Admin Dashboard:** [https://spotify-admin-blond.vercel.app/](https://spotify-admin-blond.vercel.app/)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.
