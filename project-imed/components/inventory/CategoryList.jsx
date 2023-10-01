"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null); // New state for handling errors
  const router = useRouter()
  const dummyData = [
    { id: 1, name: 'Category A', status: 'Active' },
    { id: 2, name: 'Category B', status: 'Inactive' },
    { id: 3, name: 'Category C', status: 'Active' },
  ];
  const deleteHandler = (id) => {
    axios.delete('/api/categories', {data:{id}}).then((respocnse) => {
      toast.success("deleted successfully");
      setTimeout(() => {router.refresh()},1000);
    }).catch(err =>{
      toast.error("Error deleting category")
    });
  };
  const editHandler = (deleteId) => {
    if(deleteId) router.push("/dashboard/inventory/categorys/add?id="+deleteId)
  };
  useEffect(() => {
    // Fetch categories data from the API route using Axios
    axios.get('/api/categories')
      .then((response) => {
        setCategories(response.data.result.data);
        setError(null); // Clear any previous errors on successful fetch
      })
      .catch((error) => {
        setError('Error fetching data. Please try again later.'); // Set an error message
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-white w-full h-full p-6">
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
              <tr key={category._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border">{index+1}</td>
                <td className="py-2 px-4 border">{category.name}</td>
                <td className="py-2 px-4 border">{category.isActive ? "Active":"Inactive"}</td>
                <td className="py-2 px-4 border">
                  <button onClick={()=>editHandler(category._id)}  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                    Edit
                  </button>
                  <button onClick={()=>deleteHandler(category._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    </div>
  );
}

export default CategoryList;

