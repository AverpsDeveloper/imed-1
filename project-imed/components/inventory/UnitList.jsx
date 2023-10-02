"use client"

import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
function CategoryList() {

  const [filterType, setFilterType] = useState('itemTypes');
  const [categories, setTypesData] = useState([])

  // Check if categories is undefined or not an array, and set it to an empty array if necessary.
  // if (!Array.isArray(categories)) {
  //   categories = [];
  // }

  const [searchTerm, setSearchTerm] = useState('');

  const nextCategoryId =
    categories.length > 0 ? Math.max(...categories.map(category => category.id)) + 1 : 1;

  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
    function filterHandler(type){
      setFilterType(type)
    }
    function deleteHandler(name){
      axios.delete(`/api/types/${filterType}`,{data:{name}}).then(({data}) =>{
        console.log(data);
        toast.success(data.result.message);
      }).catch((error) =>{
        toast.error('There was an error. Please try again');
      }); 
    }
    useEffect(()=>{
      axios.get(`/api/types/${filterType}`)
      .then(({ data }) => {
        setTypesData(data.result.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error('There was an error. Please try again');
      });
    },[filterType,deleteHandler])
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Unit List</h1>
        <Link href="/dashboard/inventory/units/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Unit
          </button>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
          {/* <button
            className={`px-4 py-2 rounded ${
              setFilterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => filterHandler("")}
          >
            All
          </button> */}
          <button
            className={`px-4 py-2 rounded ${
              filterType === 'itemTypes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => filterHandler("itemTypes")}
          >
            Item Type
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterType === 'formTypes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() =>  filterHandler("formTypes")}
          >
            Form Type
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterType === 'unitsTypes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() =>  filterHandler("unitsTypes")}
          >
            Units Type
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filterType === 'strengthTypes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => filterHandler("strengthTypes")}
          >
            Strength Type
          </button>
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
              <th className="py-2 px-4 border">Unit Name</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((name, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4 border">{index+1}</td>
                <td className="py-2 px-4 border">{name}</td>
                <td className="py-2 px-4 border">
                  <button onClick={()=>deleteHandler(name)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
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
// Dummy data for testing
