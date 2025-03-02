import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>PDF Tools App</h1>
        <p>All-in-one PDF management made easy!</p>
      </header>
      <div className="home-grid">
        <Link to="/compress" className="home-card">
          <h2>Compress PDF</h2>
          <p>Reduce PDF size efficiently</p>
        </Link>
        <Link to="/merge" className="home-card">
          <h2>Merge PDFs</h2>
          <p>Combine multiple PDFs into one</p>
        </Link>
        <Link to="/split" className="home-card">
          <h2>Split PDF</h2>
          <p>Extract pages from a PDF</p>
        </Link>
        <Link to="/convert-excel" className="home-card">
          <h2>Convert to Excel</h2>
          <p>Convert PDF to Excel</p>
        </Link>
        <Link to="/extract-images" className="home-card">
          <h2>Extract Images </h2>
          <p>Extract images from pdf</p>
        </Link>
        <Link to="/extract-pages" className="home-card">
          <h2>Extract Pages </h2>
          <p>Extract pages from pdf</p>
        </Link>
        <Link to="/image-to-pdf" className="home-card">
          <h2>Image to Pdf </h2>
          <p>convert images to pdf instantly</p>
        </Link>
      </div>

      {/* Footer with About Us */}
      <footer className="home-footer">
        <div className="about-us">
          <h3>About Us</h3>
          <p>
            PDF Tools App is designed to simplify PDF management. We offer 
            easy-to-use tools for compressing, merging, splitting, and 
            converting PDFs. Our goal is to provide a seamless experience 
            for users who work with PDF documents daily.
          </p>
        </div>
        <p className="footer-text">© 2025 PDF Tools App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
