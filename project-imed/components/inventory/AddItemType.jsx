"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

function AddCategoryForm() {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // Handle the form submission here
    axios.post("/api/new-inventory-units", data)
    .then(({data}) => {
      if(data.success) {
        toast.success("New Product added successfully");
      }else{
        toast.error(data.message);
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error("There was an error. Please try again");
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col ">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Item Type</h1>
          <Link href="/dashboard/inventory/item-type-list">
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Item Type List
          </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Item Type Name</label>
            <Controller
              name="medicinesUnitsName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Item Type Name"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Status</label>
            <Controller
              name="medicinesUnitsStatus"
              control={control}
              defaultValue="active"
              render={({ field }) => (
                <div className="flex items-center">
                  <input
                    {...field}
                    type="radio"
                    value="Active"
                    id="active"
                    className="mr-2"
                  />
                  <label htmlFor="active">Active</label>
                  <input
                    {...field}
                    type="radio"
                    value="Inactive"
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

 