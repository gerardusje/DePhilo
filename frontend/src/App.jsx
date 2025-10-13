// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Galeri from "./pages/Galeri";
import CategoryDetail from "./pages/categoryDetail";
import ItemDetail from "./components/ItemDetail";
import Contact from "./pages/Contact";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App font-sans flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/galeri/:categoryName" element={<CategoryDetail />} />
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/galeri/:categoryName/:itemId" element={<ItemDetail />} />

            <Route path="/admin/login" element={<AdminLogin />} />

            {/* <Route path="/galeri/:categoryName/:itemId" element={<ItemDetail />} /> */}


            {/* Bisa tambah halaman lain jika dibutuhkan */}
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
