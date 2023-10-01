
import React,{useState,useEffect} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Category Name is required'),
  status: Yup.string().required('Category Status is required'),
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

function AddCategoryForm() {
  const rotuer = useRouter();
  const params = useSearchParams();
  const paramsId = params.get("id")
  const initialValues = {
    name: '',
    status: 'active',
  };

  const onSubmit = (values, { resetForm }) => {
    // Handle the form submission here
      if(paramsId){
        values.id = paramsId;
        axios.put('/api/categories', values)
        .then(({ data }) => {
          toast.success(data.result.message);
          rotuer.push("/dashboard/inventory/categorys")
        }).catch(({error})=>{
          toast.error(error.message);
        })
      }else{
        axios.post('/api/categories', values)
        .then(({ data }) => {
          console.log("================================");
          console.log(data);
            toast.success('New Category added successfully');
            resetForm(); // Reset the form after successful submission
            // rotuer.push("/dashboard/inventory/categorys")
        })
        .catch(({error}) => {
          console.error(error);
          toast.error('There was an error. Please try again');
        });
      }

  };
 
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="bg-white w-full h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Add Category</h1>
          <Link href="/dashboard/inventory/categorys">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Category List
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
              <label className="block text-gray-600">Category Name</label>
              <Field
                type="text"
                name="name"
                className="border rounded w-full px-3 py-2 mt-1"
                placeholder="Enter category name"
              />
              <ErrMassage name="name" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Status</label>
              <Field
                as="select"
                name="status"
                className="border rounded w-full px-3 py-2 mt-1"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrMassage name="status" />
            </div>
            {paramsId ? (
               <button
               type="submit"
               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
             >
               Update
             </button>
            ): (
              <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            )}
            
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddCategoryForm;