# Full-Stack Student Management App

This is a full-stack web application built with **React** for the frontend and **Laravel** for the backend API. It allows users to manage a list of students, including creating, editing, viewing, and deleting records.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Laravel API, MySQL
- **API Communication:** Axios
- **Package Management:** npm & Composer

---

## 📦 Prerequisites

- Node.js (v18+)
- Composer
- PHP (v8.1+)
- MySQL or any compatible database

---

## 🖥️ React Frontend Setup 

### Navigate to frontend
cd frontend-crud-application

### Install dependencies
npm install

### Start the dev server
npm run dev

---

## 🧱 Laravel Backend Setup 

### Navigate to backend
cd backend-crud-application

### Install dependencies
composer install

### Copy environment file and set up DB
cp .env.example .env
php artisan key:generate

### Configure DB credentials in .env
### Then run migrations:
php artisan migrate

### Start Laravel server
php artisan serve
