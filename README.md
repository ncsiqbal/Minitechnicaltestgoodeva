# Mini Technical Test – Fullstack Todo App

Aplikasi **Daftar Tugas** sederhana yang dibangun dengan **NestJS** (Backend) dan **React + Vite** (Frontend).

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
- Tooling: Docker & Docker Compose

---

## 🔧 Requirements

- Node.js **20.19+**
- npm **≥ 9**
- Docker (optional, recommended)

---

## ▶️ Running Project Locally (Development Mode)
1️⃣ Run Backend (NestJS)

Masuk ke folder backend:

```
cd backend
```

Install dependencies:

```
npm install
```

Jalankan backend:

```
npm run start:dev
```


Backend akan berjalan di:

```
http://localhost:3000
```

---

## 🔐 Authentication (Required)

Backend menggunakan **auth ringan**.
Setiap request WAJIB menyertakan header berikut:
```
x-user-id: demo-user 
```


Jika header tidak dikirim → ```response 401``` Unauthorized

---

## 2️⃣ Run Frontend (React)

Kembali ke root project:
```
cd ..
```
Install dependencies:
```
npm install
```
Jalankan frontend:
```
npm run dev
```
Frontend akan berjalan di:
```
http://localhost:5173
```

---
## 🔗 Backend API Endpoints
| method            | endpoint                | Description                       |
| ----------------- | ----------------------- |---------------------------------- |
| GET               | ```/api/todos```        | Get all todos (+ optional search) |
| Styling           | ```/api/todos```        | Create new todo                   |
| Motion            | ```/api/todos/:id```    | Toggle todo completed status      |
| Font Optimization | ```/api/todos/:id```    | Delete todo                       |

---

## 🧪 Frontend Features Detail

- ➕ Create new todo

- 🔍 Search todo (client-side filter)

- ☑️ Toggle completed status using PATCH

- 🗑 Delete todo with confirmation modal

- ❌ Error message handling

---

## 🧠 Technical Decisions

1. **PATCH Method** : PATCH digunakan untuk toggle completed karena hanya mengubah sebagian field, bukan seluruh resource.

3. **In-memory Storage** : Digunakan untuk kesederhanaan sesuai instruksi (tanpa database).

4. **Client-side Search** : Search dilakukan di frontend untuk mengurangi kompleksitas backend.

5. **Auth via Header** : Header x-user-id digunakan sebagai auth ringan sesuai bonus task.

6. **Minimal UI** : Fokus pada fungsionalitas, bukan styling berlebihan.

---

## 🐳 Running with Docker (Bonus)

Pastikan tidak ada service lain yang menggunakan port ``` 3000``` .
``` 
docker compose up --build
``` 

Akses aplikasi:

Frontend → http://localhost:5173

Backend → http://localhost:3000

----
## 📸 Screenshot
<img width="1168" height="800" alt="Cuplikan layar 2026-01-16 155101" src="https://github.com/user-attachments/assets/b3bbd195-31f5-4ed0-af29-9e71c75603d2" />

---

---

## ⚠️ **DISCLAIMER**

**Author:** Muhammad Iqbal 

> Development dilakukan menggunakan **perangkat milik teman kuliah** karena perangkat pribadi sedang dalam proses **perbaikan (service)**.  
> Seluruh implementasi, arsitektur, dan kode ditulis secara mandiri oleh author.

---
