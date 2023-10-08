"use client"

import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useSearchParams } from 'next/navigation';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product Name is required'),
  type: Yup.string().required('Item Type is required'),
  categories: Yup.array().of(Yup.string()).min(1),
  tags: Yup.array().of(Yup.string()).min(1),
  healthConditions: Yup.array().of(Yup.string()).min(1),
  codeName: Yup.string().required('Item Code is required'),
  form: Yup.string().required('Form is required'),
  dispanseForm: Yup.string().required('Dispensed Form is required'),
  strength: Yup.string().required('Strength is required'),
  prefQtyOne: Yup.string().required('Preferred Quantity 1 is required'),
  prefQtyTwo: Yup.string().required('Preferred Quantity 2 is required'),
  prefQtyThree: Yup.string().required('Preferred Quantity 3 is required'),
  repeatConsult: Yup.number().test('is boolean', 'Please enter either 1 or 0',
    (value) => value == 0 || value == 1),
  isActive: Yup.number().test('is boolean', 'Please enter either 1 or 0',
    (value) => value == 0 || value == 1),
  yearLimit: Yup.number().typeError('Limit per Year must be a number').integer('Limit per Year must be an integer').positive('Limit per Year must be positive').required('Limit per Year is required'),
  buildCostPrUnit: Yup.number().typeError('Manufacturing Price per Unit must be a number').positive('Manufacturing Price per Unit must be positive').required('Manufacturing Price per Unit is required'),
  prefQtyFixed: Yup.number().typeError('Qty per Month Supply must be a number').integer('Qty per Month Supply must be an integer').positive('Qty per Month Supply must be positive').required('Qty per Month Supply is required'),
  retailPrice: Yup.number().typeError('Retail Price must be a number').positive('Retail Price must be positive').required('Retail Price is required'),
});

function ErrMessage({ name }: any) {
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

  const [itemTypes, setItemTypes] = useState([]);
  const [formOptions, setFormOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [healthConditions, setHealthConditions] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    type: null,
    categories: null,
    codeName: '',
    status: true,
    form: null,
    dispanseForm: null,
    strength: '',
    prefQtyOne: '',
    prefQtyTwo: '',
    prefQtyThree: '',
    repeatConsult: '0',
    yearLimit: '',
    buildCostPrUnit
      : '',
    prefQtyFixed: '',
    retailPrice: '',
  });
  const params = useSearchParams();
  const paramsId = params.get("id");

 

  // console.log("erros", errors)

  const onSubmit = (values: any, { resetForm }: any) => {
    // Handle the form submission here    
    if (paramsId) {
      values.id = paramsId;
      console.log("put", "sss");
      axios.put('/api/inventory', values)
        .then(({ data }) => {
          console.log("data::", data);
          toast.success(data.result.message);
          resetForm(); // Reset the form after successful submission
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.error.message);
        });
    } else {
      values.totalCount = 10,
        values.prefQtyFixed = "90";
      values.saving = "calc";
      axios.post('/api/inventory', values)
        .then(({ data }) => {
          console.log(data);
          toast.success(data.result.message);
          resetForm(); // Reset the form after successful submission
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.error.message);
        });
    }
  };

  useEffect(() => {
    if (paramsId) {
      axios.get(`/api/inventory/${paramsId}`)
        .then(({ data }) => {
          console.log("data.result.data.prefOtyOne.qty", data.result.data.prefQtyOne);

          let productItem = {
            ...data.result.data,
            prefQtyOne: data.result.data.prefQtyOne.qty,
            prefQtyThree: data.result.data.prefQtyThree.qty,
            prefQtyTwo: data.result.data.prefQtyTwo.qty,
            prefQtyFixed: data.result.data.prefQtyFixed.qty,
            isActive: data.result.data.isActive ? "1" : "0",
            repeatConsult: data.result.data.repeatConsult ? "1" : "0",
          }
          setInitialValues(productItem)

        }).catch((err) => {
          console.log("error:::", err);

          // toast.error(error.message);
        })
    }

    axios.get(`/api/types/itemTypes`)
      .then(({ data }) => {
        let items = data.result.data.map((item: any) => (
          { value: item, label: item }
        ))
        setItemTypes(items)
      })

    axios.get(`/api/types/formTypes`)
      .then(({ data }) => {
        let items = data.result.data.map((item: any) => (
          { value: item, label: item }
        ))
        setFormOptions(items)
      })

    axios.get(`/api/categories`)
      .then(({ data }) => {
        let items = data.result.data.map((item: any) => (
          { value: item.name, label: item.name, }
        ))
        setCategories(items)
      })
    axios.get(`/api/tags`)
      .then(({ data }) => {
        let items = data.result.data.map((item: any) => (
          { value: item.name, label: item.name,  }
        ))
        setTags(items)
      })
    axios.get(`/api/health-conditions`)
      .then(({ data }) => {
        let items = data.result.data.map((item: any) => (
          { value: item.name, label: item.name,  }
        ))
        setHealthConditions(items)
      })
  }, [paramsId])

  // const dispensedFormOptions = [
  //   { value: 'box', label: 'Box' },
  //   { value: 'bottle', label: 'Bottle' },
  //   // Add more dispensed form options as needed
  // ];


  return (
    <div className="min-h-screen bg-gray-200 flex ">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Product</h1>
          <Link href="/dashboard/inventory/products">
            <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
              Product List
            </button>
          </Link>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched }) =>{ 
            console.log("erors", errors);
            return (
            <Form >
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
                <label className="block text-gray-600">Categories</label>
                <Field
                  name="categories"
                  component={SelectField} // Custom component for react-select
                  options={categories}
                  isMulti="true"
                />
                <ErrMessage name="categories" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">health Conditions</label>
                <Field
                  name="healthConditions"
                  component={SelectField} // Custom component for react-select
                  options={healthConditions}
                  isMulti="true"
                />
                <ErrMessage name="healthConditions" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Tags</label>
                <Field
                  name="tags"
                  component={SelectField} // Custom component for react-select
                  options={tags}
                  isMulti="true"
                />
                <ErrMessage name="tags" />
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
                  name="isActive"
                  as="select"
                  className="border rounded w-full px-3 py-2 mt-1"
                >
                  <option value='1'>Active</option>
                  <option value="0">Inactive</option>
                </Field>
                <ErrMessage name="isActive" />
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
                  name="dispanseForm"
                  component={SelectField}
                  options={formOptions}
                />
                <ErrMessage name="dispanseForm" />
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
                  name="prefQtyOne"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Preferred Quantity 1"
                />
                <ErrMessage name="prefQtyOne" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Preferred Quantity 2</label>
                <Field
                  type="text"
                  name="prefQtyTwo"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Preferred Quantity 2"
                />
                <ErrMessage name="prefQtyTwo" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Preferred Quantity 3</label>
                <Field
                  type="text"
                  name="prefQtyThree"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Preferred Quantity 3"
                />
                <ErrMessage name="prefQtyThree" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Repeat Consultation Within 1 Year</label>
                <Field
                  as="select"
                  name="repeatConsult"
                  className="border rounded w-full px-3 py-2 mt-1"
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </Field>
                <ErrMessage name="repeatConsult" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Limit per Year</label>
                <Field
                  type="number"
                  name="yearLimit"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Limit per Year"
                />
                <ErrMessage name="yearLimit" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Manufacturing Price per Unit</label>
                <Field
                  type="number"
                  name="buildCostPrUnit"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Manufacturing Price per Unit"
                />
                <ErrMessage name="buildCostPrUnit" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600">Qty per Month Supply</label>
                <Field
                  type="number"
                  name="prefQtyFixed"
                  className="border rounded w-full px-3 py-2 mt-1"
                  placeholder="Enter Qty per Month Supply"
                />
                <ErrMessage name="prefQtyFixed" />
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
                {paramsId ? "Update" : "Save"}
              </button>
            </Form>
          )}}
        </Formik>
      </div>
    </div>
  );
}

// Custom component for react-select

const SelectField = ({ field, form, options, isMulti = false }: any) => (
  <Select
    {...field}
    isMulti={isMulti}
    options={options}
    defaultValue={field.value || 'Select'}
    onChange={(selectedOption: any) => {
      form.setFieldValue(field.name, selectedOption ?
        Array.isArray(selectedOption) ? selectedOption.map(s => s.value) : selectedOption.value : ''
      ); // Extract the value property or set an empty string if nothing is selected
      form.setFieldTouched(field.name, true);
    }}
    onBlur={() => {
      // Trigger onBlur only when the user clicks on the Select component
      form.setFieldTouched(field.name, true);
    }}
    value={options.filter((option: any) => Array.isArray(field.value) ? field.value.includes(option.value) : option.value === field.value)} // Set the value prop to the corresponding field value
    isClearable
  />
)


// const MyField = (props:any) => {
//   const {
//     values: { buildCostPrUnit, prefQtyFixed },
//     touched,
//     setFieldValue,
//   } = useFormikContext<any>();
//   const [field, meta] = useField(props);

//   React.useEffect(() => {
//     // set the value of textC, based on textA and textB
//     if (
//       prefQtyFixed  &&
//       buildCostPrUnit &&
//       touched.prefQtyFixed &&
//       touched.buildCostPrUnit
//     ) {
//       setFieldValue(props.name, (+prefQtyFixed) * (+buildCostPrUnit));
//     }
//   }, [prefQtyFixed, buildCostPrUnit, touched.prefQtyFixed, touched.buildCostPrUnit, setFieldValue, props.name]);

//   return (
//     <>
//       <input {...props} {...field} />
//       {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
//     </>
//   );
// };



export default AddProductForm;