# PRANEIZ

A Clothing brand — fashion, redefined with timeless charm and effortless grace. This repository contains a multi-part full-stack project for an e-commerce clothing storefront (frontend, backend, and admin panel). A live frontend demo is available at: [https://praneizfrontend.vercel.app](https://praneizfrontend.vercel.app)

---

## 📖 About

PRANEIZ is an e-commerce project for a clothing brand. The repository is structured as a monorepo with separate folders for `frontend`, `backend`, and an `admin` panel.

This README was generated to give a clear on-boarding path for other developers and contributors.

---

## 🌐 Live Demo

Frontend live at: [https://praneizfrontend.vercel.app](https://praneizfrontend.vercel.app)

---

## ⚙️ Tech Stack

- **Frontend:** React (CRA or Next.js), modern JavaScript, componentized UI
- **Backend:** Node.js + Express (REST API)
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT-based authentication
- **File / Images:** Cloudinary (for product images)
- **Styling:** Tailwind CSS or CSS modules
- **Deployment:** Vercel (frontend), Render (backend)

---

## 📂 Folder Structure

```
PRANEIZ/
├─ admin/          # Admin panel (frontend)
├─ backend/        # Express API (controllers, routes, models)
├─ frontend/       # Public storefront (React)
└─ README.md
```

**Inside each folder:**

- `package.json` — scripts & dependencies
- `src/` or `server.js` — entry point
- `routes/`, `controllers/`, `models/` (backend)
- `components/`, `pages/`, `styles/` (frontend)

---

## ✨ Features

- 🔐 User authentication (register / login)
- 🛍️ Product catalog with images
- 📄 Product detail pages
- 🛠️ Admin panel for adding/updating products
- 📤 Image upload support
- 🌐 REST API consumed by frontend
- 📱 Responsive UI

---

## 📦 Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (Atlas or local)
- (Optional) Cloudinary account
- Git

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder (rename from `.env.example` if present). Example keys:

```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
CLIENT_URL=http://localhost:3000
```

> Replace/remove Cloudinary keys if you use a different storage method.

---

## 🚀 Install & Run (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/guni2605/PRANEIZ.git
cd PRANEIZ
```

### 2. Backend

```bash
cd backend
npm install
# create .env using the keys above
npm run dev   # or `npm start`
```

### 3. Frontend

```bash
cd ../frontend
npm install
npm run dev   # or `npm start` → http://localhost:3000
```

### 4. Admin

```bash
cd ../admin
npm install
npm run dev
```

> Open the frontend in your browser and verify it talks to the backend. Update `CLIENT_URL` and API base URL if backend runs on a different port.

---

## 📡 API — Common Routes (Examples)

**Auth**

- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login and receive JWT

**Users**

- `GET /api/users/me` — get current user (protected)
- `PUT /api/users/:id` — update user (protected)

**Products**

- `GET /api/products` — list products
- `GET /api/products/:id` — get product detail
- `POST /api/products` — create product (admin)
- `PUT /api/products/:id` — update product (admin)
- `DELETE /api/products/:id` — delete product (admin)

**Images**

- `POST /api/upload` — upload product images (returns image URL)

---

## ☁️ Deployment

- **Frontend:** Vercel (connected to `frontend` folder). Set `NEXT_PUBLIC_API_URL` or similar env var to your backend URL.
- **Backend:** Deploy Node/Express on Render / Railway / Heroku / DigitalOcean App Platform. Set env variables (`MONGO_URI`, `JWT_SECRET`, Cloudinary keys).

> Optionally, containerize with Docker and deploy anywhere.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/awesome-thing`
3. Commit changes and push
4. Open a Pull Request describing your changes

Please include an overview of your changes and any setup steps for testing.

---

## 🛠️ Troubleshooting & Notes

- ❌ Frontend cannot reach backend → check CORS settings and API base URL.
- 📸 Image uploads fail → confirm Cloudinary credentials.

---

## 📬 Contact

Maintainer: [guni2605](https://github.com/guni2605)

---
