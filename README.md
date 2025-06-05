# 🎁 Basketries - Gifting Platform

Basketries is a modern web application designed to help users easily find personalized gifts. It features role-based authentication with **Admin** and **User** roles, secure signup/login with Firebase, and CRUD functionality for managing gift data (Admins only).

---

## 🚀 Live Demo

🌐 [Click here to visit the deployed site](https://your-deployed-link.vercel.app)

---

## 📚 Features

- 🔐 **Firebase Authentication** (Email & Google Signup/Login)
- 🧑‍💻 Role-Based Access: Admin vs User
- 📝 Admin CRUD Panel (Add, Edit, Delete gifts)
- 🎁 Gift Listing and Search for Users
- ⚡ Tailwind CSS for responsive UI

---

## 🛠️ Technologies Used

- React.js
- Firebase Auth & Firestore
- React Router DOM
- Tailwind CSS

---

### 🔄 CRUD Functionality (Admin Only)

Admins have access to a dedicated panel to manage gifts:

| Action   | Description                              |
|----------|------------------------------------------|
| Create   | Admins can add new gifts to Firestore    |
| Read     | Gifts are fetched and displayed on UI    |
| Update   | Admins can edit gift details             |
| Delete   | Admins can permanently delete gifts      |

All data is stored and managed in Firestore using Firebase's `setDoc`, `updateDoc`, and `deleteDoc`.

---

## 🧑‍⚖️ Role-Based Access Control (RBAC)

### How Roles Are Assigned:
- During signup, a checkbox allows selecting "Register as Admin".
- Based on the checkbox, users are saved in Firestore with the role:
  ```json
  {
    email: "user@example.com",
    role: "admin" // or "user"
  }

<h5>How Roles Are Checked:
After login, the user’s role is fetched from Firestore.

Conditional rendering shows admin panel links only to admins.

Admin routes like /admin are protected.</h5>

🔐 Admin Credentials (For Testing)

<h5>If your project has hardcoded test credentials for the admin panel:

            txt
            Copy
            Edit
            Email: admin@example.com
            Password: admin123
            Alternatively, any new user can register as an admin by checking "Register as Admin" during signup.
</h5>



🧪 Testing the Role-Based Visibility

<h5>
        Signup as Admin → See Admin Panel

        Logout and Signup as User → Admin Panel is hidden

        Try accessing /admin route manually as user → Redirects or shows access denied
</h5>

###  🚀 Getting Started (Local Setup)
  <h5>      Clone the repo:

            bash
            Copy
            Edit
            git clone https://github.com/your-username/basketries.git
            cd basketries
            Install dependencies:

            bash
            Copy
            Edit
            npm install
            Setup Firebase:

            Go to firebase/firebaseConfig.js

            Add your Firebase config keys

            Run the app:

            bash
            Copy
            Edit
      <h3>      npm run dev
###  🌍 Deployment:
<h5>    This project can be easily deployed using Vercel or Netlify:

        bash
        Copy
        Edit
        npm run build
        Then connect your GitHub repo to Vercel or Netlify and deploy 🚀
</h5>



📧 Contact
Made with ❤️ by TalhaXcodes
📩 Email: tshahbaz36@gmail.com


