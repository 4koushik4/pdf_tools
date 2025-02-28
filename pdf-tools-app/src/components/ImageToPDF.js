import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./ImageToPDF.css";

const ImageToPDF = () => {
  const [images, setImages] = useState([]);
  const [pdfName, setPdfName] = useState("converted.pdf");

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  const handleConvertToPDF = () => {
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");
    images.forEach((img, index) => {
      const imgWidth = 210;
      const imgHeight = 297;
      if (index > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", 0, 0, imgWidth, imgHeight);
    });

    pdf.save(pdfName);
  };

  return (
    <div className="image-to-pdf-container">
      <h2>Image to PDF Converter</h2>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <input
        type="text"
        placeholder="Enter PDF name (e.g., myfile.pdf)"
        value={pdfName}
        onChange={(e) => setPdfName(e.target.value)}
      />
      <button onClick={handleConvertToPDF}>Convert & Download</button>

      <div className="image-preview">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Preview ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageToPDF;
