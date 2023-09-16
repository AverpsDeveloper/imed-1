"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';

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
          <h1 className="text-2xl font-bold">Add Unit</h1>
          <Link href="/dashboard/inventory/unit-list">
          
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Unit List
          </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Unit Name</label>
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

 
