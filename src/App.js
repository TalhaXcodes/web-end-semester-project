import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// Layouts
import AdminLayout from './components/admin/adminNavbar/AdminLayout';
import Layout from './components/layout';

// Public Pages
import Questionnaire from './components/questionnaire/Questionnaire';
import About from './pages/About';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import Detail from './pages/details';
import Home from './pages/home';
import Services from './pages/Services';

// Admin Pages
import AddCategoryForm from './components/admin/adminPages/AddCategory';
import AddProductForm from './components/admin/adminPages/AddProduct';
import AdminHome from './components/admin/adminPages/AdminHome';
import CategoryTable from './components/admin/adminPages/ManageCategory';
import ProductTable from './components/admin/adminPages/ManageProduct';

// Protected Route
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route path="category/:category" element={<CategoryPage />} />
          <Route path=":slug" element={<Detail />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Panel (Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="add-product" element={<AddProductForm />} />
          <Route path="product-table" element={<ProductTable />} />
          <Route path="add-category" element={<AddCategoryForm />} />
          <Route path="category-table" element={<CategoryTable />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
