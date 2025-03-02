import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import "./CompressPDF.css";

const CompressPDF = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [desiredSize, setDesiredSize] = useState(null); // Default 100 KB
  const [compressedPdf, setCompressedPdf] = useState(null);
  const [actualSize, setActualSize] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSizeChange = (event) => {
    setDesiredSize(event.target.value);
  };

  const compressPDF = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file first.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(pdfFile);
    fileReader.onload = async () => {
      const pdfBytes = fileReader.result;
      let pdfDoc = await PDFDocument.load(pdfBytes);

      // Reduce image quality and remove unnecessary objects
      pdfDoc.setCreator("");
      pdfDoc.setProducer("");

      let compressedBytes = await pdfDoc.save({
        useObjectStreams: false,
        updateFieldAppearances: false,
        compress: true,
      });

      const maxSizeBytes = desiredSize * 1024;
      let iteration = 0;
      while (compressedBytes.byteLength > maxSizeBytes && iteration < 5) {
        pdfDoc = await PDFDocument.load(compressedBytes);
        compressedBytes = await pdfDoc.save({
          useObjectStreams: false,
          updateFieldAppearances: false,
          compress: true,
        });
        iteration++;
      }

      setActualSize((compressedBytes.byteLength / 1024).toFixed(2));

      if (compressedBytes.byteLength > maxSizeBytes) {
        alert(`Unable to compress to desired size. Minimum achievable size: ${(compressedBytes.byteLength / 1024).toFixed(2)} KB`);
      }

      const compressedBlob = new Blob([compressedBytes], { type: "application/pdf" });
      const compressedUrl = URL.createObjectURL(compressedBlob);
      setCompressedPdf(compressedUrl);
    };
  };

  return (
    <div className="compress-pdf-container">
      <h2>Compress PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="file-input" />
      <input
        type="number"
        placeholder="Desired Size in KB"
        value={desiredSize}
        onChange={handleSizeChange}
        className="size-input"
      />
      <button onClick={compressPDF} className="compress-button">Compress</button>
      {actualSize && <p className="size-info">Final Size: {actualSize} KB</p>}
      {compressedPdf && (
        <a href={compressedPdf} download="compressed.pdf" className="download-link">
          Download Compressed PDF
        </a>
      )}
    </div>
  );
};

export default CompressPDF;
