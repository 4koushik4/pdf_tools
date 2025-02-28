import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">PDF Tools</div>
      <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/merge" onClick={closeMenu}>Merge PDF</Link></li>
        <li><Link to="/split" onClick={closeMenu}>Split PDF</Link></li>
        <li><Link to="/compress" onClick={closeMenu}>Compress PDF</Link></li>
        <li><Link to="/convert-excel" onClick={closeMenu}>Convert to Excel</Link></li>
        <li><Link to="/extract-images" onClick={closeMenu}>Extract Images</Link></li>
        <li><Link to="/extract-pages" onClick={closeMenu}>Extract Pages</Link></li>
        <li><Link to="/image-to-pdf" onClick={closeMenu}>Image to PDF</Link></li> {/* ✅ New Feature */}
      </ul>
    </nav>
  );
};

export default Navbar;
