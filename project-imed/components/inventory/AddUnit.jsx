"use client"
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  medicinesUnitsName: Yup.string().required('Unit Name is required'),
  medicinesUnitsStatus: Yup.string().required('Unit Status is required'),
});

function ErrMessage({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 text-sm">{msg}</div>
      )}
    />
  );
}

function AddUnitForm() {
  const initialValues = {
    medicinesUnitsName: '',
    medicinesUnitsStatus: 'active',
  };

  const onSubmit = (values, { resetForm }) => {
    // Handle the form submission here
    axios.post('/api/new-inventory-units', values)
      .then(({ data }) => {
        if (data.success) {
          toast.success('New Unit added successfully');
          resetForm(); // Reset the form after successful submission
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('There was an error. Please try again');
      });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Unit</h1>
          <Link href="/dashboard/inventory/unit-list">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Unit List
            </button>
          </Link>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-600">Unit Name</label>
              <Field
                type="text"
                name="medicinesUnitsName"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Units name"
              />
              <ErrMessage name="medicinesUnitsName" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Status</label>
              <Field
                as="select"
                name="medicinesUnitsStatus"
                className="border rounded w-full px-3 py-2 mt-1"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrMessage name="medicinesUnitsStatus" />
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddUnitForm;