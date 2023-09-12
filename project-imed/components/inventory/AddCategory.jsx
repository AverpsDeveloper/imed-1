"use client"
import React, { useState } from 'react';

function AddCategory() {
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleAddCategory = () => {
    // Here, you can implement the logic for adding the category data (categoryData) to your server.
    // Ensure your server handles the category creation.
    // You can also show a loading spinner or progress bar during the category creation process.
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Category Name</label>
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Category Description</label>
        <textarea
          name="description"
          value={categoryData.description}
          onChange={handleInputChange}
          className="border p-2 w-full h-20"
        />
      </div>
      <div>
        <button
          className="bg-iSubmitBtn hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

export default AddCategory;
