# 💰 Expense Tracker

A full-stack Expense Tracker built using the MERN stack. The application allows users to securely register, log in, and manage their daily expenses through a clean dashboard with visual analytics.

## ✨ Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- 💸 Add and manage expenses
- 📊 Expense visualization using Chart.js
- 🥧 Pie Chart for category-wise expenses
- 📈 Bar Chart for expense analysis
- 🔒 Protected Dashboard
- 📱 Responsive React UI
- ☁️ MongoDB database integration

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Chart.js
- React ChartJS 2
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- CORS
- dotenv

---

## 📂 Project Structure

```
Expense Tracker/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/Expense-Tracker.git
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for JWT authentication |

---

## 📸 Screenshots

You can add screenshots here after deployment.

- Login Page
- Register Page
- Dashboard
- Expense Charts

---

## 🚀 Future Improvements

- Edit & Delete expenses
- Monthly reports
- Budget planning
- Export data as PDF/Excel
- Dark Mode
- Profile management
- Expense filtering by date/category

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

### 👨‍💻 Author

**Parth Dubey**

If you found this project helpful, feel free to ⭐ the repository.
