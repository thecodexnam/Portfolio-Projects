🧑‍🍳 School Canteen Ordering System (Frontend)
<img width="1896" height="880" alt="image" src="https://github.com/user-attachments/assets/8af1e3b0-ecd6-4830-8ea1-9e69ebabec8f" />
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/22d0970b-9b98-4a24-8625-b819936af9d0" />
<img width="1919" height="891" alt="image" src="https://github.com/user-attachments/assets/6ed377b0-83f4-4419-a1ca-b389ef9bc955" />



This is a basic React + TypeScript frontend project built as part of a Frontend Screening Task.
The project simulates a school canteen digital ordering system where students can view snacks, place orders, and track their spending.

This is a learning/prototype project, not a production-grade application.

🎯 Objective

The goal of this project is to demonstrate:

Clean React component structure

Basic state management

Simple form handling and validation

Mock API/data handling

Good UI/UX practices

Clear and readable code

🛠️ Tech Stack Used

React (with Vite)

TypeScript

React Router – for page navigation

React Context API – for global state management

localStorage – for data persistence

Basic CSS / inline styles (kept simple intentionally)

No complex or unnecessary libraries were used to keep the project beginner-friendly and easy to understand.

📦 Features Implemented
✅ Snacks

View available snacks

Each snack shows:

Name

Price

Order count

Order button for each snack

✅ Students

Create new students

Auto-generate referral codes

View list of students

Track total money spent by each student

✅ Orders

Place orders for students

Select quantity (1–5)

Track order history per student

Automatically updates:

Student’s total spent

Snack’s order count

✅ Persistence

Students, snacks, and orders are stored in localStorage

Data does not disappear on page refresh

📄 Pages in the App

Snacks Page (/)

Students Page (/students)

Student Detail Page (/students/:id)

Create Student Page (/create-student)

🧱 Component Structure

SnackCard – displays individual snack details

StudentItem – displays student summary

OrderForm – handles placing orders

Navbar – navigation between pages

Components are kept small and reusable.

🔄 State Management

Global state is managed using React Context API, which stores:

Snacks

Students

Orders

This keeps data consistent across all pages.

🧪 Mock Data Approach

No real backend is used

Initial snack data is hardcoded

All updates happen in frontend state

localStorage is used to simulate persistence

This approach was chosen to keep the focus on frontend logic and UI behavior.

🧑‍💻 Setup Instructions
1️⃣ Clone the Repository
git clone <your-github-repo-url>
cd school-canteen

2️⃣ Install Dependencies
npm install

3️⃣ Run the App
npm run dev


The app will be available at:

http://localhost:5173

📁 Project Structure (Simplified)
src/
│
├── components/
├── pages/
├── context/
├── data/
├── App.tsx
└── main.tsx

📌 Notes

This project focuses on clarity and understanding, not advanced patterns.

Code is written in a human-readable, beginner-friendly way.

Easy to extend with:

Backend APIs

Authentication

Better UI styling

React Query or Redux

📜 PROMPTS_USED.md

A file named PROMPTS_USED.md is included in the repository, listing the AI prompts used during development, as required by the assignment.

✅ Conclusion

This project successfully demonstrates:

React fundamentals

Component reusability

State and data handling

Clean UI flow

Practical frontend problem-solving
