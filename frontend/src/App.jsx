import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/publicLayout";

// Pages
import Home from "./pages/publicPages/homePage/Home";
import About from "./pages/publicPages/aboutPage/About";
import Services from "./pages/publicPages/servisPage/Services";
import Galeri from "./pages/publicPages/galeriPage/Galeri";
import CategoryDetail from "./pages/publicPages/galeriPage/categoryDetail";
import ItemDetail from "./pages/publicPages/galeriPage/ItemDetail";
import Contact from "./pages/publicPages/contactPage/Contact";
import AdminPage from "./pages/adminPages/AdminPage";
import BarangPage from "./pages/adminPages/barangPage";
import AdminLogin from "./pages/adminPages/AdminLogin";
import AdminRoute from "./components/routes/AdminRoutes";
import DashboardAdmin from "./pages/adminPages/DasboardAdmin";
import NotFound from "./pages/NotFound";
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
          <Route path="*" element={<NotFound />} />

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
