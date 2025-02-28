// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MergePDF from './components/MergePDF';
import SplitPDF from './components/SplitPDF';
import CompressPDF from './components/CompressPDF';
import ExtractPages from "./components/ExtractPages";
import ConvertToExcel from './components/ConvertToExcel';
import ExtractImages from './components/ExtractImages';
import ImageToPDF from './components/ImageToPDF'; // ✅ Import Image to PDF Component
import About from './components/About';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/merge" element={<MergePDF />} />
          <Route path="/split" element={<SplitPDF />} />
          <Route path="/compress" element={<CompressPDF />} />
          <Route path="/extract-pages" element={<ExtractPages />} />
          <Route path="/convert-excel" element={<ConvertToExcel />} />
          <Route path="/extract-images" element={<ExtractImages />} />
          <Route path="/image-to-pdf" element={<ImageToPDF />} /> {/* ✅ Added Route */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
