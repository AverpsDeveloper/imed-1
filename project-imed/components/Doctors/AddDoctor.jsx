"use client"
import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { Formik, Field, Form, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  username: Yup.string().matches(/^\S*$/, "This field cannot contain white space.").required('Username is required.'),
  email: Yup.string().email().required('Email is required.'),
  password: Yup.string().required('Password is required.'),
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  address: Yup.string().required('Address is required.'),
  profilePhoto: Yup.string(),
  gender: Yup.string().required('Please select user gender.'),
  phoneNumber: Yup.number().required('Phone number is required.'),
  age: Yup.number().required('Age is required.'), 
  status: Yup.string().required('Please select status.'),
  speciality: Yup.string().required('Please select status.'),
  availableHours: Yup.string().required('Please select status.'),
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
const AddManager = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    profilePhoto: '',
    gender: '',
    phoneNumber: '',
    age: '',
    status: '',
    speciality : '',
    availableHours : '',
  }
  const onSubmit = (data) => {
    data.role = "DOCTOR"
    axios.post("/api/users-admin",data).then(({response})=>{
      toast.success(response.data.error.message);
    }).catch(({response})=>{
      toast.error(response.data.error.message);
    })
  };

  return (
    <>
      <Breadcrumb pageName="Add Manager" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col gap-9 col-span-3">
          {/* <!-- Add Manager Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                New Doctor
              </h3>
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
                    <div className="p-6.5">

                      <div className="mb-4.5">
                        <div className="mb-4">
                          <label className="block text-gray-600">Username<span className="text-meta-1">*</span></label>
                          <Field
                            type="text"
                            name="username"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Product name"
                          />
                          <ErrMessage name="username" />
                        </div>
                      </div>


                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-gray-600">First name<span className="text-meta-1">*</span></label>
                            <Field
                              type="text"
                              name="firstName"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="First name"
                            />
                            <ErrMessage name="firstName" />
                          </div>
                        </div>

                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-gray-600">Last name<span className="text-meta-1">*</span></label>
                            <Field
                              type="text"
                              name="lastName"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="Last name"
                            />
                            <ErrMessage name="lastName" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-gray-600">Age<span className="text-meta-1">*</span></label>
                            <Field
                              type="number"
                              name="age"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="Age"
                            />
                            <ErrMessage name="age" />
                          </div>
                        </div>

                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-black dark:text-white">Gender<span className="text-meta-1">*</span></label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                              <Field as="select" name="gender"
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              >
                                <option >Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </Field>
                              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                <svg
                                  className="fill-current"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g opacity="0.8">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                      fill=""
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                            </div>
                            <ErrMessage name="gender" />
                          </div>
                        </div>

                      </div>

                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-gray-600">Phone number<span className="text-meta-1">*</span></label>
                            <Field
                              type="number"
                              name="phoneNumber"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="phone number"
                            />
                            <ErrMessage name="phoneNumber" />
                          </div>
                        </div>

                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-black dark:text-white">Status<span className="text-meta-1">*</span></label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                              <Field as="select" name="status"
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              >
                                <option >Select Status</option>
                                <option value="online">Online</option>
                                <option value="ofline">Ofline</option>
                              </Field>
                              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                <svg
                                  className="fill-current"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g opacity="0.8">
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                      fill=""
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                            </div>
                            <ErrMessage name="status" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-gray-600">Speciality</label>
                            <Field
                              type="text"
                              name="speciality"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="Enter Speciality of the Doctor..."
                            />
                            <ErrMessage name="speciality" />
                          </div>
                        </div>

                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-black dark:text-white">Available Hours</label>
                            <Field
                              type="text"
                              name="availableHours"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="Enter available  Hours..."
                            />
                            <ErrMessage name="availableHours" />
                            <ErrMessage name="status" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-gray-600">Email address<span className="text-meta-1">*</span></label>
                            <Field
                              type="email"
                              name="email"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="Email address"
                            />
                            <ErrMessage name="email" />
                          </div>
                        </div>

                        <div className="w-full xl:w-1/2">
                          <div className="mb-4">
                            <label className="block text-gray-600">User Login Password<span className="text-meta-1">*</span></label>
                            <Field
                              type="text"
                              name="password"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                              placeholder="User Login password"
                            />
                            <ErrMessage name="password" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4.5">
                        <div className="mb-4">
                          <label className="block text-gray-600">Address <span className="text-meta-1">*</span></label>
                          <Field
                            type="text"
                            name="address"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            placeholder="Address"
                          />
                          <ErrMessage name="address" />
                        </div>
                      </div>

                      <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                        Add Doctor
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>

      </div >
    </>
  )
}

export default AddManager;