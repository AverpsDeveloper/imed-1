"use client"

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-select';

const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Product Name is required'),
  itemType: Yup.string().required('Item Type is required'),
  category: Yup.string().required('Category is required'),
  itemCode: Yup.string().required('Item Code is required'),
  status: Yup.string().required('Status is required'),
  form: Yup.string().required('Form is required'), 
  dispensedForm: Yup.string().required('Dispensed Form is required'),
  strength: Yup.string().required('Strength is required'),
  preferredQuantity1: Yup.string().required('Preferred Quantity 1 is required'),  
  preferredQuantity2: Yup.string().required('Preferred Quantity 2 is required'),  
  preferredQuantity3: Yup.string().required('Preferred Quantity 3 is required'), 
  repeatConsultation: Yup.string().required('Repeat Consultation is required'),  
  limitPerYear: Yup.number().typeError('Limit per Year must be a number').integer('Limit per Year must be an integer').positive('Limit per Year must be positive').required('Limit per Year is required'),  
  manufacturingPricePerUnit: Yup.number().typeError('Manufacturing Price per Unit must be a number').positive('Manufacturing Price per Unit must be positive').required('Manufacturing Price per Unit is required'),  
  qtyPerMonthSupply: Yup.number().typeError('Qty per Month Supply must be a number').integer('Qty per Month Supply must be an integer').positive('Qty per Month Supply must be positive').required('Qty per Month Supply is required'),  
  retailPrice: Yup.number().typeError('Retail Price must be a number').positive('Retail Price must be positive').required('Retail Price is required'),  
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

function AddProductForm() {
  const initialValues = {
    name: '',
    type: null,
    category: null,
    codeName: '',
    status: true,
    form: null,  
    dispanseForm: null,  
    strength: '',
    prefQtyOne: '', 
    prefQtyTwo: '',  
    prefQtyThree: '', 
    repeatConsultation: 'no',  
    limitPerYear: '',  
    buildCost: '',  
    prefQtyMonth: '',  
    retailPrice: '',  

  };

  const onSubmit = (values:any, { resetForm } ) => {
    // Handle the form submission here
    console.log("values::",values);
    
    axios.post('/api/inventory', values)
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          toast.success('New Product added successfully');
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

  // Mock data for item types and categories (you can fetch this data from an API)
  const itemTypes = [
    { value: 'type1', label: 'Type 1' },
    { value: 'type2', label: 'Type 2' },
    // Add more item types as needed
  ];

  const categories = [
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    // Add more categories as needed
  ];

  const formOptions = [
    { value: 'tablet', label: 'Tablet' },
    { value: 'capsule', label: 'Capsule' },
    // Add more form options as needed
  ];
  
  const dispensedFormOptions = [
    { value: 'box', label: 'Box' },
    { value: 'bottle', label: 'Bottle' },
    // Add more dispensed form options as needed
  ];
  
  

  return (
    <div className="min-h-screen bg-gray-200 flex ">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Product</h1>
          <Link href="/dashboard/inventory/products">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Product List
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
              <label className="block text-gray-600">Product Name</label>
              <Field
                type="text"
                name="name"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Product Name"
              />
              <ErrMessage name="name" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Item Type</label>
              <Field
                name="type"
                component={SelectField} // Custom component for react-select
                options={itemTypes}
              />
              <ErrMessage name="type" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Category</label>
              <Field
                name="category"
                component={SelectField} // Custom component for react-select
                options={categories}
              />
              <ErrMessage name="category" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Item Code</label>
              <Field
                type="text"
                name="codeName"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Item Code"
              />
              <ErrMessage name="codeName" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Status</label>
              <Field
                name="status"
                as="select"
                className="border rounded w-full px-3 py-2 mt-1"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrMessage name="status" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Form</label>
              <Field
                name="form"
                component={SelectField}
                options={formOptions}
              />
              <ErrMessage name="form" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Dispensed Form</label>
              <Field
                name="dispensedForm"
                component={SelectField}
                options={dispensedFormOptions}
              />
              <ErrMessage name="dispensedForm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Strength</label>
              <Field
                type="text"
                name="strength"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Strength"
              />
              <ErrMessage name="strength" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Preferred Quantity 1</label>
              <Field
                type="text"
                name="preferredQuantity1"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Preferred Quantity 1"
              />
              <ErrMessage name="preferredQuantity1" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Preferred Quantity 2</label>
              <Field
                type="text"
                name="preferredQuantity2"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Preferred Quantity 2"
              />
              <ErrMessage name="preferredQuantity2" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Preferred Quantity 3</label>
              <Field
                type="text"
                name="preferredQuantity3"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter Preferred Quantity 3"
              />
              <ErrMessage name="preferredQuantity3" />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Repeat Consultation Within 1 Year</label>
                <Field
                  as="select"
                  name="repeatConsultation"
                  className="border rounded w-full px-3 py-2 mt-1"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Field>
                <ErrMessage name="repeatConsultation" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Limit per Year</label>
                <Field
                  type="number"
                  name="limitPerYear"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Limit per Year"
                />
                <ErrMessage name="limitPerYear" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Manufacturing Price per Unit</label>
                <Field
                  type="number"
                  name="manufacturingPricePerUnit"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Manufacturing Price per Unit"
                />
                <ErrMessage name="manufacturingPricePerUnit" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Qty per Month Supply</label>
                <Field
                  type="number"
                  name="qtyPerMonthSupply"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Qty per Month Supply"
                />
                <ErrMessage name="qtyPerMonthSupply" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Retail Price</label>
                <Field
                  type="number"
                  name="retailPrice"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Retail Price"
                />
                <ErrMessage name="retailPrice" />
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

// Custom component for react-select

const SelectField = ({ field, form, options }:any) => (
  <Select
    {...field}
    options={options}
    onChange={(selectedOption) => {
      form.setFieldValue(field.name, selectedOption ? selectedOption.value : ''); // Extract the value property or set an empty string if nothing is selected
      form.setFieldTouched(field.name, true);
    }}
    onBlur={() => {
      // Trigger onBlur only when the user clicks on the Select component
      form.setFieldTouched(field.name, true);
    }}
    value={options.find((option:any) => option.value === field.value)} // Set the value prop to the corresponding field value
    isClearable
  />
);




export default AddProductForm;