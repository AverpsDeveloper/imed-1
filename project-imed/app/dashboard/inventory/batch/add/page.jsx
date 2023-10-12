"use client"
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import AsyncSelect from 'react-select/async';
import Loader from "@/components/common/Loader";

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Batch name is required'),
  isActive: Yup.string().required('Batch status is required'),
  description: Yup.string(),
  // location: Yup.string().required('Location is required'),
  arriveAt: Yup.date().required('Date is required'),
  // batchCost: Yup.number().required('Batch cost is required'),
  // sellingPrice: Yup.number().required('Selling price is required'),
});

function ErrMassage({ name }) {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className="text-red-500 text-sm">{msg}</div>
      )}
    />
  );
}

function AddNewBatch() {
  const rotuer = useRouter();
  const params = useSearchParams();
  const [itemOptions, setItemOptions] = useState([]);
  const paramsId = params.get("id");
  const [loading, setLoading] = useState(false);

  const [initialValues,setinitialValues] = useState({
          name: '',
          isActive: 'isActive',
          description: '',
          // location: "",
          arriveAt: Date.now(),
          // batchCost: "",
          // sellingPrice: "",
        });
  
  const onSubmit = (values, { resetForm }) => {
    // Handle the form submission here
    setLoading(true)
    if (paramsId) {
      values.id = paramsId;
      axios.put('/api/item-batch', values)
        .then(({ data }) => {
          setLoading(false)
          toast.success(data.result.message);
          rotuer.push("/dashboard/inventory/batch")
        }).catch(({ error }) => {
          setLoading(false)
          toast.error(error.message);
        })
    } else {
      axios.post('/api/item-batch', values)
        .then(({ data }) => {
          setLoading(false)
          toast.success('New Batch added successfully');
          resetForm(); // Reset the form after successful submission
          // rotuer.push("/dashboard/inventory/batch")
        })
        .catch((data) => {
          setLoading(false)
          toast.error("There was an error");
        });
    }

  };

  const loadOptionsHandler = async (search) => {
    try {
      const { data } = await axios.get('/api/inventory', { params: { search } })
      const d = data.result.data.map(d => ({ value: d.name, label: d.name, id: d._id }))
      setItemOptions(d);
      return d;
    } catch (error) {
      return []
    }
  }

  useEffect(()=>{
    if(paramsId){
      setLoading(true)
      axios.get(`/api/item-batch/${paramsId}`)
      .then((response) => {  
        setItemOptions([{ value: response.data.result.data.item.name, label: response.data.result.data.item.name, id: response.data.result.data.item._id }]);
        setinitialValues(response.data.result.data);
        console.log("response::",response);      
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
    }
  },[])

  if(loading){
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add new batch</h1>
          <Link href="/dashboard/inventory/batch"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Batch List
          </Link>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize = {true}
        >
          <Form>
            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Batch Name</label>
              <Field
                type="text"
                name="name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Batch name"
              />
              <ErrMassage name="name" />
            </div>
            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Product</label>
              <Field
                type="text"
                component={SelectField}
                loadOptions={loadOptionsHandler}
                options={itemOptions}
                name="item"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Batch name"
              />
              <ErrMassage name="name" />
            </div>

            {/* <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Location</label>
              <Field
                type="text"
                name="location"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Enter location"
              />
              <ErrMassage name="location" />
            </div> */}


            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Date</label>
              <Field
                type="date"
                name="arriveAt"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Date"
              />
              <ErrMassage name="arriveAt" />
            </div>

            {/* <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Batch cost</label>
              <Field
                type="text"
                name="batchCost"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Batch cost"
              />
              <ErrMassage name="batchCost" />
            </div> */}


            {/* <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Selling price</label>
              <Field
                type="text"
                name="sellingPrice"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Selling price"
              />
              <ErrMassage name="sellingPrice" />
            </div> */}

            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Description</label>
              <Field
                type="text"
                name="description"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Description"
              />
              <ErrMassage name="description" />
            </div>


            <div className="mb-4">
              <label className="mb-3 block text-black dark:text-white">Batch status</label>
              <Field
                as="select"
                name="isActive"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </Field>
              <ErrMassage name="isActive" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {paramsId ? "Update" : "Save"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddNewBatch;

const SelectField = ({ field, form, options = [], isMulti = false, loadOptions }) => (
  <AsyncSelect
    {...field}
    isMulti={isMulti}
    options={options}
    loadOptions={loadOptions}
    cacheOptions
    defaultOptions={options}
    onChange={(selectedOption) => {
      console.log("selectedOption", selectedOption)
      form.setFieldValue(field.name, selectedOption ?
        Array.isArray(selectedOption) ? selectedOption.map(s => s.value) : selectedOption.id : ''
      ); // Extract the value property or set an empty string if nothing is selected
      form.setFieldTouched(field.name, true);
    }}
    onBlur={() => {
      // Trigger onBlur only when the user clicks on the Select component
      form.setFieldTouched(field.name, true);
    }}
    value={options.filter((option) => Array.isArray(field.value) ? field.value.includes(option.value) : option.id === field.value)} // Set the value prop to the corresponding field value
    isClearable
  />
)