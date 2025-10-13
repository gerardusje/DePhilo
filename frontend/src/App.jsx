import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/publicLayout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Galeri from "./pages/Galeri";
import CategoryDetail from "./pages/categoryDetail";
import ItemDetail from "./components/ItemDetail";
import Contact from "./pages/Contact";
import AdminPage from "./pages/adminPages/AdminPage";
import BarangPage from "./pages/adminPages/barangPage";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/routes/AdminRoutes";
import DashboardAdmin from "./pages/adminPages/DasboardAdmin";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="contact" element={<Contact />} />
          <Route path="galeri/:categoryName" element={<CategoryDetail />} />
          <Route path="galeri/:categoryName/:itemId" element={<ItemDetail />} />
        </Route>

        {/* Admin login */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Admin dashboard (protected) */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/barang"
          element={
            <AdminRoute>
              <BarangPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
