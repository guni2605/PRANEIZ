###PRANEIZ

A Clothing brand — fashion, redefined with timeless charm and effortless grace. This repository contains a multi-part full‑stack project for an e‑commerce clothing storefront (frontend, backend, and admin panel). A live frontend demo is available at: https://praneizfrontend.vercel.app

##About

PRANEIZ is an e‑commerce project for a clothing brand. The repository is structured as a monorepo with separate folders for frontend, backend, and an admin panel.

This README was generated to give a clear on‑boarding path for other developers and contributors.

##Live demo

Frontend live at: https://praneizfrontend.vercel.app

Tech stack

Frontend: React, modern JavaScript, componentized UI

Backend: Node.js + Express (REST API)

DB: MongoDB (Mongoose)

Authentication: JWT based authentication

File / images: Image upload (Cloudinary ) for product images

Styling: Tailwind CSS or regular CSS modules

Deployment: Vercel for frontend; Render for backend

Folder structure (high level)

PRANEIZ/
├─ admin/ # optional admin panel (frontend)
├─ backend/ # Express API (controllers, routes, models)
├─ frontend/ # Public storefront (React)
└─ README.md

Inside each folder you'd normally find:

package.json — scripts & deps

src/ or server.js — entry point

routes/, controllers/, models/ (backend)

components/, pages/, styles/ (frontend)

Features (expected)

User authentication (register / login)

Product catalog with images

Product detail pages

Admin panel for adding/updating products

Image upload support

REST API consumed by frontend

Responsive UI

Prerequisites

Node.js (v16+ recommended)

npm or yarn

MongoDB (Atlas or local)

(Optional) Cloudinary account

Git

Environment variables (example)

Create a .env file in the backend/ folder (rename from .env.example if present). Typical keys used by this kind of project:

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>
CLIENT_URL=http://localhost:3000

Replace or remove Cloudinary keys if your project uses a different storage method.

Install & run (local development)

Clone the repo

git clone https://github.com/guni2605/PRANEIZ.git
cd PRANEIZ

Backend

cd backend
npm install

# create .env using the keys above

npm run dev # or `npm start` depending on package.json scripts

Frontend

cd ../frontend
npm install
npm run dev # or `npm start` — opens on http://localhost:3000

Admin

cd ../admin
npm install
npm run dev

Open the frontend in your browser and verify it talks to the backend. If backend runs on a different port, update CLIENT_URL and any API base URL in frontend config.

API — common routes (examples)

These are example routes based on typical MERN e‑commerce projects. Replace with the actual endpoints from your code.

Auth

POST /api/auth/register — register new user

POST /api/auth/login — login and receive JWT

Users

GET /api/users/me — get current user (protected)

PUT /api/users/:id — update user (protected)

Products

GET /api/products — list products

GET /api/products/:id — get product detail

POST /api/products — create product (admin)

PUT /api/products/:id — update product (admin)

DELETE /api/products/:id — delete product (admin)

Images

POST /api/upload — upload product images (returns image URL)

Deployment

Frontend: Vercel (connected to the frontend folder). Set NEXT_PUBLIC_API_URL or similar env var to your backend URL.

Backend: Deploy Node/Express on Render / Railway / Heroku / DigitalOcean App Platform. Set environment variables (MONGO_URI, JWT_SECRET, Cloudinary keys).

If you prefer, you can also containerize using Docker and deploy to any provider that supports Docker images.

Contributing

Fork the repo

Create a feature branch: git checkout -b feature/awesome-thing

Commit changes and push

Open a Pull Request describing your changes

Please include an overview of what you changed and any setup steps needed to test.

Troubleshooting & notes

If the frontend cannot reach the backend, check CORS settings and the API base URL.

If image uploads fail, confirm Cloudinary credentials and that server can reach those services.

Use npm run lint / npm test if lint/test scripts are provided.
