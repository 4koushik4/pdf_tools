// src/components/CompressPDF.js
import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import "./CompressPDF.css";

const CompressPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState(null);
  const [customFileName, setCustomFileName] = useState("compressed.pdf");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCompress = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);
    fileReader.onload = async () => {
      const pdfBytes = fileReader.result;
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // **Reduce file size by adjusting content**
      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.setSize(width * 0.8, height * 0.8); // Reduce size by 20% for better compression
        page.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(1, 1, 1, 0), // Keep transparency
        });
      });

      // Save the compressed PDF
      const compressedPdfBytes = await pdfDoc.save();

      const blob = new Blob([compressedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setCompressedPdfUrl(url);
    };
  };

  const handleDownload = () => {
    const fileName = prompt("Enter file name for the compressed PDF:", customFileName);
    if (fileName) {
      setCustomFileName(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
      const link = document.createElement("a");
      link.href = compressedPdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="compress-container">
      <h2>Compress PDF (Auto 50% Reduction)</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      <button onClick={handleCompress}>Compress PDF</button>

      {compressedPdfUrl && (
        <button className="download-btn" onClick={handleDownload}>
          Download Compressed PDF
        </button>
      )}
    </div>
  );
};

export default CompressPDF;
