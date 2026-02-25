
It allows managing students and their marks using a REST API with a React frontend.

---

##  Tech Stack

**Backend:** Node.js, Express.js, PostgreSQL  
**Frontend:** React.js, Bootstrap, Axios

---

## API Endpoints
# Students

POST /students → Add student

GET /students?page=1&limit=5 → Paginated list

GET /students/:id → Get student + marks

PUT /students/:id → Update student

DELETE /students/:id → Delete student

# Marks

POST /marks → Add marks for student

## Features

- Add, update, delete students  
- Add marks for students  
- View student details with marks  
- Pagination support in student list  
- Normalized database schema with foreign key  
- Automatic deletion of marks using `ON DELETE CASCADE`

---

## 🗄 Database Setup

Create PostgreSQL database and run:

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(50),
    score INT
);


```
## Backend Setup
git clone https://github.com/Shivam-Tidke/machine-test-server
cd machine-test-server
npm install
npm start

## Frontend Setup
git clone https://github.com/Shivam-Tidke/machine-test-client
cd machine-test-client
npm install
npm start
