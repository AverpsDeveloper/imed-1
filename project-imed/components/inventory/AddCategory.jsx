"use client"
{/* 
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

import React from 'react';
import { useForm, Controller } from 'react-hook-form';

function AddCategoryForm() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // Handle the form submission here
    console.log(data);
  };

  return (
     <div className="min-h-screen flex items-center justify-center"> 
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Category</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Category List
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Category Name</label>
            <Controller
              name="categoryName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter category name"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Status</label>
            <Controller
              name="categoryStatus"
              control={control}
              defaultValue="active"
              render={({ field }) => (
                <div className="flex items-center">
                  <input
                    {...field}
                    type="radio"
                    value="active"
                    id="active"
                    className="mr-2"
                  />
                  <label htmlFor="active">Active</label>
                  <input
                    {...field}
                    type="radio"
                    value="inactive"
                    id="inactive"
                    className="ml-4 mr-2"
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryForm;
*/}
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

function AddCategoryForm() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // Handle the form submission here
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col ">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Category</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Category List
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Category Name</label>
            <Controller
              name="categoryName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter category name"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Status</label>
            <Controller
              name="categoryStatus"
              control={control}
              defaultValue="active"
              render={({ field }) => (
                <div className="flex items-center">
                  <input
                    {...field}
                    type="radio"
                    value="active"
                    id="active"
                    className="mr-2"
                  />
                  <label htmlFor="active">Active</label>
                  <input
                    {...field}
                    type="radio"
                    value="inactive"
                    id="inactive"
                    className="ml-4 mr-2"
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryForm;

 
