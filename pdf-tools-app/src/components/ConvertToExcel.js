import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import * as XLSX from "xlsx";
import "./ConvertToExcel.css";

// Set the correct PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ConvertToExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelFileUrl, setExcelFileUrl] = useState(null);
  const [customFileName, setCustomFileName] = useState("converted.xlsx");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const extractTableFromPDF = async (pdfData) => {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    let extractedData = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const textItems = textContent.items.map((item) => item.str);
      extractedData.push(textItems);
    }

    return extractedData;
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);
    fileReader.onload = async () => {
      const pdfBytes = fileReader.result;
      const extractedData = await extractTableFromPDF(pdfBytes);

      // Convert extracted data to an Excel file
      const worksheet = XLSX.utils.aoa_to_sheet(extractedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Create a Blob URL for download
      const excelBlob = new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(excelBlob);
      setExcelFileUrl(url);
    };
  };

  const handleDownload = () => {
    const fileName = prompt("Enter file name for the Excel file:", customFileName);
    if (fileName) {
      setCustomFileName(fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`);
      const link = document.createElement("a");
      link.href = excelFileUrl;
      link.download = customFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="convert-container">
      <h2>Convert PDF to Excel</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      <button onClick={handleConvert}>Convert to Excel</button>

      {excelFileUrl && (
        <button className="download-btn" onClick={handleDownload}>
          Download Excel File
        </button>
      )}
    </div>
  );
};

export default ConvertToExcel;
