# Mini Technical Test – Fullstack Todo App

A simple fullstack Todo application built with **React (Vite)** and **NestJS**.

---

## ✨ Features

### Backend (NestJS)
- `GET /api/todos?search=` – list todos with optional search
- `POST /api/todos` – create todo
- `PATCH /api/todos/:id` – toggle completed
- `DELETE /api/todos/:id` – delete todo
- In-memory storage
- DTO + class-validator
- CORS enabled
- Simple auth via `x-user-id` header

### Frontend (React)
- Add todo
- Search todo
- Toggle completed (PATCH)
- Delete todo (with modal confirmation)
- Loading & error state
- Minimal dark UI

---

## 🛠 Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: NestJS + TypeScript
- Docker & Docker Compose

---

## 🔧 Requirements

- Node.js **20.19+**
- Docker **(recommended)**

---

## ▶️ Run with Docker (Recommended)

```bash
docker compose up --build
