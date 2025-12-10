# CourseMaster

## 📚 Project Description

**CourseMaster** is a full-featured, production-ready E-learning platform built with the **MERN stack**.  
It allows students to browse, enroll, and consume courses, while admins can manage courses, batches, and review assignments.  

Key features include:

- Student registration, login, and course enrollment
- Secure JWT authentication and role-based access
- Course catalog with search, filter, sort, and pagination
- Video lectures, assignments, and quizzes
- Admin dashboard with CRUD operations for courses and batches
- Real-time progress tracking and certificate issuance

---

backend/.env
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_access_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
ADMIN_REG_KEY=admin123
FRONTEND_URL=https://course-master-client.vercel.app

STRIPE_SECRET_KEY=sk_test.....       
STRIPE_WEBHOOK_SECRET=whsec....

frontend/.env
NEXT_PUBLIC_API_URL=https://course-master-server-two.vercel.app/api


