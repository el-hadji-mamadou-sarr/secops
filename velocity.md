
# 🚀 Velocity Project (Dockerized Full Stack E-Commerce Platform) by TSB04

This repository contains the complete Dockerized environment for **Velocity Wheels**, a modern full-stack e-commerce platform for custom bicycles and cycling gear.

---

## 📂 Project Structure

```
/project-root
├── velocity/               # Main application source code
│   ├── front/              # Static frontend (HTML, CSS, JS, assets)
│   ├── back/               # Node.js + Express + Stripe backend
│   └── README.md           # Full app documentation (features, dev setup, more)
├── docker-compose.yml      # Global compose for front & back
└── velocity.md             # This high-level Docker and orchestration overview
```

---

## 📝 Project Overview

- **Frontend**: Static HTML, Tailwind CSS, vanilla JS, animated, mobile-first, production-ready.
- **Backend**: Express.js REST API with secure Stripe payments. Optimized for security, size, and minimal dependencies.

👉 **For full app features and developer instructions, see [`velocity/README.md`](velocity/README.md).**

---

## 🐳 Docker & Orchestration

### **Containers Provided**

| Service   | Base Image           | Size (typical) | Exposed Port | Purpose                                  |
|-----------|----------------------|---------------|--------------|------------------------------------------|
| backend   | node:20-alpine       | 70–90 MB      | 4242         | Stripe payment API, Express REST server  |
| front     | nginx:stable-alpine  | 10–50 MB      | 8080         | Ultra-fast static website server         |

---

### **Why Docker?**
- One-command launch of the full stack (no node or nginx install needed!)
- Guaranteed consistency across dev, CI, and prod
- Minimal images: production-only, no dev dependencies, no bloat

---

## 🐳 Docker Images: Layers & Optimization

### **Backend (`back/Dockerfile`):**
- **FROM node:20-alpine:** Slim official Node base.
- **Layers:**  
  1. Set working directory  
  2. Copy `package*.json` and install only production deps (`npm ci --only=production`)  
  3. Remove npm cache (saves ~20MB)  
  4. Copy source code  
  5. Set `NODE_ENV=production` and start

- **Why so small?**  
  - No dev dependencies
  - No build tools or docs
  - No `node_modules` copied (fresh install inside container)

### **Frontend (`front/Dockerfile`):**
- **FROM nginx:stable-alpine:** Tiny base, runs static files via Nginx.
- **Layers:**  
  1. Remove default HTML  
  2. Copy in only your front-end files/assets

- **Image size is almost entirely your own image/font/media assets.**

---

## ⚡️ Commands & Usage

### **1. Build everything (from root):**
```bash
docker-compose build --no-cache
```
This builds both front and back images, always fresh.

### **2. Run both containers:**
```bash
docker-compose up
```

- Access the site at: [http://localhost:8080](http://localhost:8080)
- Backend API at: [http://localhost:4242](http://localhost:4242)

### **3. Stopping & Cleaning up**
```bash
docker-compose down
```
Stops containers and network (but not images).

### **4. Remove everything (including images):**
```bash
docker-compose down --rmi all
```

---

## ⚙️ Environment Variables

Each service can have its own `.env` file for secrets/config:
- `/velocity/back/.env` for backend (Stripe keys, port)
- `/velocity/front/.env` (if you have custom runtime env for frontend; not needed for static sites)

Docker Compose automatically loads these based on the `env_file:` directive per service.

---

## 🟢 Use Cases

- **Local Development:**  
  Run both services with a single command, no global Node or Nginx install needed.
- **CI/CD:**  
  Build, test, and deploy the same images everywhere.
- **Production:**  
  Images are as small as possible, contain no dev dependencies, and are easy to deploy to any cloud with Docker support.

---

## 🔎 Inspecting Images & Layers

See images and sizes:
```bash
docker images
```
Inspect layers:
```bash
docker history velocity-backend
docker history velocity-frontend
```

Remove all unused images/containers/networks/volumes:
```bash
docker system prune -af
```

---

## 📝 More Info & Customization

- See [`velocity/README.md`](velocity/README.md) for:
  - Features
  - Tech stack details
  - Architecture
  - Customization and extension
  - Development setup

---

## 🛠️ Troubleshooting

- If the backend can’t find environment variables, check that the `.env` file path matches `env_file` in compose and rebuild.
- If you see a module missing error, ensure it is in `dependencies` (not `devDependencies`) in `package.json`.
- For port conflicts, adjust the `ports` mapping in `docker-compose.yml`.

---


## 📦 Published Docker Images

- **Backend:**  
  [`tsb04/velocity-backend`](https://hub.docker.com/repository/docker/tsbarry/velocity-backend/)

- **Frontend:**  
  [`tsb04/velocity-frontend`](https://hub.docker.com/repository/docker/tsbarry/velocity-frontend/)

You can pull the images directly:

```bash
docker pull tsb04/velocity-backend
docker pull tsb04/velocity-frontend
```


> _All you need is Docker. No manual setup, no dependency hell, no surprises. Happy coding!_
