import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "./ExtractImages.css";

// Set PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ExtractImages = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedImages, setExtractedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const extractImagesFromPDF = async (pdfData) => {
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    let images = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const operatorList = await page.getOperatorList();

      for (let j = 0; j < operatorList.fnArray.length; j++) {
        if (operatorList.fnArray[j] === pdfjsLib.OPS.paintImageXObject) {
          const imgObjName = operatorList.argsArray[j][0];
          const img = page.objs[imgObjName];

          if (img && img.data) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            const imageData = new ImageData(new Uint8ClampedArray(img.data), img.width, img.height);
            ctx.putImageData(imageData, 0, 0);
            images.push({ id: images.length, src: canvas.toDataURL() });
          }
        }
      }
    }
    return images;
  };

  const handleExtract = async () => {
    if (!selectedFile) {
      alert("Please upload a PDF file first!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);
    fileReader.onload = async () => {
      const pdfBytes = fileReader.result;
      const images = await extractImagesFromPDF(pdfBytes);
      if (images.length === 0) {
        alert("No images found in this PDF.");
      } else {
        setExtractedImages(images);
      }
    };
  };

  const toggleSelection = (image) => {
    setSelectedImages((prev) =>
      prev.includes(image) ? prev.filter((img) => img !== image) : [...prev, image]
    );
  };

  const handleDownload = () => {
    if (selectedImages.length === 0) {
      alert("Select at least one image to download.");
      return;
    }

    selectedImages.forEach((image, index) => {
      const fileName = prompt(`Enter file name for image ${index + 1}:`, `image-${index + 1}.png`);
      if (fileName) {
        const link = document.createElement("a");
        link.href = image.src;
        link.download = fileName.endsWith(".png") ? fileName : `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  return (
    <div className="extract-container">
      <h2>Extract Images from PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleExtract}>Extract Images</button>

      {extractedImages.length > 0 && (
        <div>
          <h3>Select Images to Download</h3>
          <div className="image-preview">
            {extractedImages.map((image) => (
              <div
                key={image.id}
                className={`image-card ${selectedImages.includes(image) ? "selected" : ""}`}
                onClick={() => toggleSelection(image)}
              >
                <img src={image.src} alt={`Extracted ${image.id}`} />
              </div>
            ))}
          </div>
          <button onClick={handleDownload}>Download Selected Images</button>
        </div>
      )}
    </div>
  );
};

export default ExtractImages;
