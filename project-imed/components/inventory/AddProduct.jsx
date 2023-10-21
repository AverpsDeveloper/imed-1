"use client"

import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Select from 'react-select';
import { useSearchParams } from 'next/navigation';
import api from '@/http';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product Name is required.'),
  type: Yup.string().required('Item Type is required.'),
  categories: Yup.array().of(Yup.string()).min(1),
  tags: Yup.array().of(Yup.string()).min(1),
  healthConditions: Yup.array().of(Yup.string()).min(1),
  codeName: Yup.string().required('Item Code is required.'),
  form: Yup.string().required('Form is required.'),
  dispanseForm: Yup.string().required('Dispensed Form is required.'),
  strength: Yup.string().required('Strength is required.'),
  prefQtyOne: Yup.string().required('Preferred quantity 1 is required.'),
  prefQtyTwo: Yup.string().required('Preferred quantity 2 is required.'),
  prefQtyThree: Yup.string().required('Preferred quantity 3 is required.'),
  repeatConsult: Yup.number().test('is boolean', 'Please enter either 1 or 0.',
    (value) => value === 0 || value === 1),
  isActive: Yup.number().test('is boolean', 'Please enter either 1 or 0.',
    (value) => value === 0 || value === 1),
  yearLimit: Yup.number()
    .typeError('Limit per year must be a number.')
    .integer('Limit per year must be an integer.')
    .positive('Limit per year must be positive.')
    .required('Limit per year is required.'),
  buildCostPrUnit: Yup.number()
    .typeError('Manufacturing price per unit must be a number.')
    .positive('Manufacturing price per unit must be positive.')
    .required('Manufacturing price per unit is required.'),
  prefQtyFixed: Yup.number()
    .typeError('Quantity per month supply must be a number.')
    .integer('Quantity per month supply must be an integer.')
    .positive('Quantity per month supply must be positive.')
    .required('Quantity per month supply is required.'),
  retailPrice: Yup.number()
    .typeError('Retail price must be a number.')
    .positive('Retail price must be positive.')
    .required('Retail price is required.'),
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

  const onSubmit = (values, { resetForm }) => {
    // Handle the form submission here    
    if (paramsId) {
      values.id = paramsId;
      api.put('/inventory', values)
        .then(({ data }) => {
          resetForm(); // Reset the form after successful submission
        })
    } else {
      values.totalCount = 10,
        values.prefQtyFixed = "90";
      values.saving = "calc";
      api.post('/inventory', values)
        .then(({ data }) => {
          resetForm(); // Reset the form after successful submission
        })
    }
  };

  useEffect(() => {
    if (paramsId) {
      api.get(`/inventory/${paramsId}`)
        .then(({ data }) => {
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
        })
    }

    api.get(`/types/itemTypes`)
      .then(({ data }) => {
        let items = data.result.data.map((item) => (
          { value: item, label: item }
        ))
        setItemTypes(items)
      })

    api.get(`/types/formTypes`)
      .then(({ data }) => {
        let items = data.result.data.map((item) => (
          { value: item, label: item }
        ))
        setFormOptions(items)
      })

    api.get(`/categories`)
      .then(({ data }) => {
        let items = data.result.data.map((item) => (
          { value: item.name, label: item.name, }
        ))
        setCategories(items)
      })
    api.get(`/tags`)
      .then(({ data }) => {
        let items = data.result.data.map((item) => (
          { value: item.name, label: item.name, }
        ))
        setTags(items)
      })
    api.get(`/health-conditions`)
      .then(({ data }) => {
        let items = data.result.data.map((item) => (
          { value: item.name, label: item.name, }
        ))
        setHealthConditions(items)
      })
  }, [paramsId])

  return (
    <div className="min-h-screen bg-gray-200 flex ">
      <div className="w-full h-full p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add new product</h1>
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
          {({ errors, touched }) => {
            console.log("erors", errors);
            return (
              <Form >
                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Product name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Product name"
                  />
                  <ErrMessage name="name" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Item type</label>
                  <Field
                    name="type"
                    component={SelectField} // Custom component for react-select
                    options={itemTypes}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                  />
                  <ErrMessage name="type" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Select categories</label>
                  <Field
                    name="categories"
                    component={SelectField} // Custom component for react-select
                    options={categories}
                    isMulti="true"
                  />
                  <ErrMessage name="categories" />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Health conditions</label>
                  <Field
                    name="healthConditions"
                    component={SelectField} // Custom component for react-select
                    options={healthConditions}
                    isMulti="true"
                  />
                  <ErrMessage name="healthConditions" />
                </div>
                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Select tags</label>
                  <Field
                    name="tags"
                    component={SelectField} // Custom component for react-select
                    options={tags}
                    isMulti="true"
                  />
                  <ErrMessage name="tags" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Item Code</label>
                  <Field
                    type="text"
                    name="codeName"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Item code"
                  />
                  <ErrMessage name="codeName" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Select product Status</label>
                  <Field
                    name="isActive"
                    as="select"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value='1'>Active</option>
                    <option value="0">Inactive</option>
                  </Field>
                  <ErrMessage name="isActive" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Form type</label>
                  <Field
                    name="form"
                    component={SelectField}
                    options={formOptions}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <ErrMessage name="form" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Dispensed Form type</label>
                  <Field
                    name="dispanseForm"
                    component={SelectField}
                    options={formOptions}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <ErrMessage name="dispanseForm" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Strength</label>
                  <Field
                    type="text"
                    name="strength"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Strength"
                  />
                  <ErrMessage name="strength" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Preferred quantity 1</label>
                  <Field
                    type="text"
                    name="prefQtyOne"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Preferred quantity 1"
                  />
                  <ErrMessage name="prefQtyOne" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Preferred quantity 2</label>
                  <Field
                    type="text"
                    name="prefQtyTwo"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Preferred quantity 2"
                  />
                  <ErrMessage name="prefQtyTwo" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Preferred quantity 3</label>
                  <Field
                    type="text"
                    name="prefQtyThree"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Preferred quantity 3"
                  />
                  <ErrMessage name="prefQtyThree" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Repeat consultation within 1 year</label>
                  <Field
                    as="select"
                    name="repeatConsult"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Field>
                  <ErrMessage name="repeatConsult" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Limit per year</label>
                  <Field
                    type="number"
                    name="yearLimit"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Limit per year"
                  />
                  <ErrMessage name="yearLimit" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Manufacturing price per unit</label>
                  <Field
                    type="number"
                    name="buildCostPrUnit"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Manufacturing price per unit"
                  />
                  <ErrMessage name="buildCostPrUnit" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Quantity per month supply</label>
                  <Field
                    type="number"
                    name="prefQtyFixed"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Quantity per month supply"
                  />
                  <ErrMessage name="prefQtyFixed" />
                </div>

                <div className="mb-4">
                  <label className="mb-3 block text-black dark:text-white">Retail price</label>
                  <Field
                    type="number"
                    name="retailPrice"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Retail price"
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
            )
          }}
        </Formik>
      </div>
    </div>
  );
}

// Custom component for react-select

const SelectField = ({ field, form, options, isMulti = false }) => (
  <Select
    {...field}
    isMulti={isMulti}
    options={options}
    defaultValue={field.value || 'Select'}
    onChange={(selectedOption) => {
      form.setFieldValue(field.name, selectedOption ?
        Array.isArray(selectedOption) ? selectedOption.map(s => s.value) : selectedOption.value : ''
      ); // Extract the value property or set an empty string if nothing is selected
      form.setFieldTouched(field.name, true);
    }}
    onBlur={() => {
      // Trigger onBlur only when the user clicks on the Select component
      form.setFieldTouched(field.name, true);
    }}
    value={options.filter((option) => Array.isArray(field.value) ? field.value.includes(option.value) : option.value === field.value)} // Set the value prop to the corresponding field value
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