import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";


// Layouts
import PublicLayout from "./components/layout/publicLayout";
import AdminRoute from "./components/routes/AdminRoutes";

// Pages - Public
import Home from "./pages/publicPages/homePage/Home";
import About from "./pages/publicPages/aboutPage/About";
import Services from "./pages/publicPages/servisPage/Services";
import Galeri from "./pages/publicPages/galeriPage/Galeri";
import ItemDetailPage from "./pages/publicPages/galeriPage/itemDetailPage";
import Contact from "./pages/publicPages/contactPage/Contact";

// Pages - Admin
import AdminLogin from "./pages/adminPages/AdminLogin";
import AdminPage from "./pages/adminPages/AdminPage";
import BarangPage from "./pages/adminPages/barangPage";
import DashboardAdmin from "./pages/adminPages/DasboardAdmin";
import CobaPage from "./pages/adminPages/CobaPage";
// Pages - Misc
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
          <Route path="galeri">
            <Route index element={<Galeri />} />
            <Route path=":slug" element={<ItemDetailPage />} />
          </Route>
          <Route path="contact" element={<Contact />} />
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
          path="/admin/tes"
          element={
            <AdminRoute>
              <CobaPage />
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
