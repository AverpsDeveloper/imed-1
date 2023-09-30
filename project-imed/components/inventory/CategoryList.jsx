"use client"
{/*
import React, { useState } from 'react';
import Link from 'next/link'

function CategoryList({ categories = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const nextCategoryId = categories.length > 0 ? Math.max(...categories.map(category => category.id)) + 1 : 1;

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category List</h1>
        <Link href="/dashboard/inventory/add-category">
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
           >
          Add Category
        </button>
        </Link>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 w-1/4"
          placeholder="Search Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCategories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Serial No</th>
              <th className="py-2 px-4 border">Category Name</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category, index) => (
              <tr key={category.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border">{category.id}</td>
                <td className="py-2 px-4 border">{category.name}</td>
                <td className="py-2 px-4 border">{category.status}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoryList;  */}

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null); // New state for handling errors
  const dummyData = [
    { id: 1, name: 'Category A', status: 'Active' },
    { id: 2, name: 'Category B', status: 'Inactive' },
    { id: 3, name: 'Category C', status: 'Active' },
  ];
  useEffect(() => {
    // Fetch categories data from the API route using Axios
    // axios.get('/api/new-inventory-category')
    //   .then((response) => {
    //     console.log(response.data.data)
        setCategories(dummyData);
    //     setError(null); // Clear any previous errors on successful fetch
    //   })
    //   .catch((error) => {
    //     setError('Error fetching data. Please try again later.'); // Set an error message
    //     console.error('Error fetching data:', error);
    //   });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category List</h1>
        <Link href="/dashboard/inventory/categorys/add">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </Link>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          className="border rounded px-3 py-2 w-1/4"
          placeholder="Search Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error ? ( // Display error message if there's an error
        <p className="text-red-500">{error}</p>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table className="w-full border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Serial No</th>
              <th className="py-2 px-4 border">Category Name</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border">{index+1}</td>
                <td className="py-2 px-4 border">{category.name}</td>
                <td className="py-2 px-4 border">{category.status}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoryList;

