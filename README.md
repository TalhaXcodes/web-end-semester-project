# 🎁 Basketries - Gifting Platform
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/TalhaXcodes/web-end-semester-project)

Basketries is a modern web application designed to help users easily find personalized gifts. It features role-based authentication with **Admin** and **User** roles, secure signup/login with Firebase (Email/Password & Google), and CRUD functionality for managing gift and category data (Admins only). The frontend is built with React and styled with Tailwind CSS, using Redux for shopping cart state management.

---

## 📚 Features

-   🔐 **Firebase Authentication**: Secure user signup and login using Email/Password or Google accounts.
-   🧑‍💻 **Role-Based Access Control**:
    -   **User Role**: Can browse products, view details, manage their shopping cart, and checkout.
    -   **Admin Role**: Access to a protected admin dashboard to manage products and categories.
-   🛒 **Shopping Cart**: Users can add products to a cart, adjust quantities. Cart data is synced with Firestore for logged-in users.
-   🛍️ **Product & Category Listing**: Users can browse gifts organized by categories and view detailed product information.
-   📝 **Admin CRUD Operations**:
    -   Manage Products: Add, view, edit, and delete gift products (name, price, category, image).
    -   Manage Categories: Add, view, edit, and delete gift categories (name, image).
-   💅 **Responsive UI**: Styled with Tailwind CSS for a modern and responsive user experience.
-   🔄 **Firestore Integration**: All application data (users, products, categories, carts) is stored and managed in Firestore.

---

## 🛠️ Technologies Used

-   **Frontend**: React.js
-   **Backend & Database**: Firebase (Authentication, Firestore)
-   **Routing**: React Router DOM
-   **State Management**: Redux & Redux Toolkit (for cart)
-   **Styling**: Tailwind CSS

---

## 🔄 CRUD Functionality (Admin Only)

Administrators have exclusive access to a dedicated panel for managing products and categories. The operations are:

| Action   | Description                                       | Firestore Methods Used (example) |
| :------- | :------------------------------------------------ | :------------------------------- |
| Create   | Admins can add new products/categories.           | `addDoc`                         |
| Read     | Products/categories are fetched and displayed.    | `getDocs`                        |
| Update   | Admins can edit details of products/categories.   | `updateDoc`                      |
| Delete   | Admins can permanently delete products/categories.| `deleteDoc`                      |

All application data is stored and managed in Firestore.

---

## 🧑‍⚖️ Role-Based Access Control (RBAC)

### How Roles Are Assigned:

-   During signup, a user can optionally check "Register as Admin".
-   Based on this selection, the user's information is saved in Firestore with an associated role:
    ```json
    {
      "email": "user@example.com",
      "role": "admin" // or "user"
    }
    ```
-   Google signups default to the "user" role.

### How Roles Are Checked:

-   After login, the user’s role is fetched from their profile in Firestore.
-   Admin-specific routes (e.g., `/admin/*`) are protected using a `ProtectedAdminRoute` component. Non-admin users attempting to access these routes are redirected.
-   The Admin Panel links and sections are conditionally rendered based on the user's role.

### Admin Account Access:

To access admin functionalities, an account must be registered with the 'Admin' role.
During the email/password signup process, ensure the "Register as Admin" checkbox is selected.

### Testing Role-Based Visibility:

1.  Sign up as an Admin (check the "Register as Admin" box) → You should see the Admin Panel and be able to navigate to admin routes.
2.  Logout.
3.  Sign up as a regular User (do not check the "Register as Admin" box) → The Admin Panel links should be hidden.
4.  Attempt to manually navigate to an admin route (e.g., `/admin`) as a regular user → You should be redirected or access should be denied.

---

## 🔥 Firebase Configuration

The application requires Firebase project configuration to connect to Firebase services.
The configuration details are located in `src/firebase/firebaseConfig.js`.

```javascript
// Example structure in src/firebase/firebaseConfig.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

While the repository might contain a default configuration, it is crucial to **replace these values with your own Firebase project's configuration credentials** for development and deployment.

---

## 🚀 Getting Started (Local Setup)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/talhaxcodes/web-end-semester-project.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd web-end-semester-project
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Set up Firebase:**
    -   Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/).
    -   Enable Email/Password and Google sign-in methods in Firebase Authentication.
    -   Set up Firestore database.
    -   Copy your Firebase project's configuration credentials.
    -   Update the `firebaseConfig` object in `src/firebase/firebaseConfig.js` with your project's credentials.

5.  **Run the application:**
    ```bash
    npm start
    ```
    This will start the development server, typically at `http://localhost:3000`.

---

## 📜 Available Scripts

In the project directory, you can run:

-   `npm start`: Runs the app in development mode.
-   `npm run build`: Builds the app for production to the `build` folder.
-   `npm test`: Launches the test runner in interactive watch mode.

---

## 🌍 Deployment

The project is built as a static site and can be deployed to various hosting platforms.

1.  **Build the application:**
    ```bash
    npm run build
    ```
    This command creates an optimized `build` folder.

2.  **Deploy:**
    -   **Firebase Hosting**: The project includes `firebase.json` and `.firebaserc` files, configured for deployment with Firebase Hosting. You can deploy using the Firebase CLI: `firebase deploy`.
    -   **Other Platforms (Vercel, Netlify, etc.)**: Connect your GitHub repository to your preferred hosting service and configure it to serve the `build` directory.

---

## 📧 Contact

Made with ❤️ by TalhaXcodes
(Muhammad Talha Shahbaz)
📩 Email: [tshahbaz36@gmail.com](mailto:tshahbaz36@gmail.com)
