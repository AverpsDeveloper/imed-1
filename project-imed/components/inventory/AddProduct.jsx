"use client"
import React, { useState } from 'react';

function ImportProductWithTemplate() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    description: '',
    information: '',
    unitOfMeasurement: 'sachet', // Default unit of measurement
    quantity: 0,
    purchaseLimit: 0,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here, you can implement the logic for uploading the selected file
      // along with the product data (productData) to your server.
      // Ensure your server handles the file upload and processes the template.
      // You can also show a loading spinner or progress bar during the upload process.
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Import Products with Template</h2>
      <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">Add Image</label>
        <input
          type="file"
          accept=".csv"
          className="border p-2"
          onChange={handleFileChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Product Description</label>
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Product Information</label>
        <textarea
          name="information"
          value={productData.information}
          onChange={handleInputChange}
          className="border p-2 w-full h-20"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Unit of Measurement</label>
        <select
          name="unitOfMeasurement"
          value={productData.unitOfMeasurement}
          onChange={handleInputChange}
          className="border p-2 w-full"
        >
          <option value="sachet">Sachet</option>
          <option value="capsule">Capsule</option>
          <option value="tablet">Tablet</option>
          <option value="box">Box</option>
          <option value="bottles">Bottles</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={productData.quantity}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Purchase Quantity Limit</label>
        <input
          type="number"
          name="purchaseLimit"
          value={productData.purchaseLimit}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-6">
        <button
          className="bg-iSubmitBtn hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded shadow-md"
          onClick={handleUpload}
        >
          Upload Products
        </button>
      </div>
    </div>
  );
}

export default ImportProductWithTemplate;
