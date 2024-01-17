"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Formik, Field, StyledTextArea, Form, ErrorMessage, useFormikContext, useField } from 'formik';
import * as Yup from 'yup';
import api from "@/http"

import { useParams } from 'next/navigation';
import moment from "moment";
import Link from "next/link";

const validationSchemaInfo = Yup.object().shape({
    username: Yup.string().matches(/^\S*$/, "This field cannot contain white space.").required('Username is required.'),
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    email: Yup.string().email().required('Email is required.'),
    age: Yup.number().required('Age is required.'),
    gender: Yup.string().required('Gender is required.'),
    nationality: Yup.string().required('Nationality is required.'),
    phoneNumber: Yup.number().required('Phone number is required.'),
    idType: Yup.string().required('Id type is required.'),
    idNumber: Yup.string().required('Id number is required.'),
    postCode: Yup.number().required('Post code is required.'),
    unitCode: Yup.number().required('Unit code is required.'),
    isAllergy: Yup.boolean().required('Allergy is required.'),
    isG6PD: Yup.boolean().required('G6PD is required.'),
    address: Yup.string().required('Address is required.'),
});

const validationSchemaActivities = Yup.object().shape({
    isActive: Yup.boolean().required('Update User Active Status.'),
})

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

const PatientsDetailsPage = () => {

    const [initialValuesActivities, setInitialValuesActivities] = useState({
        isActive: true,
    })
    const { id: username } = useParams();
    const [isEditInfo, setIsEditInfo] = useState(false);
    const [activeTab, setActiveTab] = useState("Profile");
    const [orders, setOrders] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    const [initialValuesInfo, setInitialValuesInfo] = useState({
        username: "patient",
        firstName: "first",
        lastName: "user",
        email: "patients@emial.com",
        age: "24",
        gender: "male",
        nationality: "singapore",
        phoneNumber: 12346548,
        idType: "passport",
        idNumber: "DS545SA",
        postCode: 1,
        unitCode: 12345,
        isAllergy: true,
        isG6PD: false,
        address: "Temp Address",
    })

    useEffect(() => {
        if (activeTab == 'Order History') {
            api.get('/order', {
                params: {
                    user: username
                }
            })
                .then((response) => {
                    console.log("response.data::", response.data);
                    setOrders(response?.data?.result?.data);
                    // setMeta(response?.data?.result?.meta);
                })
        }
    }, [activeTab]);
    useEffect(() => {
        if (activeTab == 'Medical History') {
            api.get('/prescription', {
                params: {
                    user: username
                }
            })
                .then((response) => {
                    console.log("response.data::", response.data);
                    setPrescriptions(response?.data?.result?.data);
                    // setMeta(response?.data?.result?.meta);
                })
        }


    }, [activeTab]);

    useEffect(() => {
        api.get(`/users/${username}`)
            .then((response) => {
                console.log(":1:response::", response);
                setInitialValuesInfo(response.data.result.data);
            })
        // api.get(`/users/${username}`)
        //     .then((response) => {
        //         setInitialValuesActivities(response.data.result.data);
        //     })
    }, [username]);

    console.log("activeTab::", activeTab);
    const onSubmitInfo = (values) => {
        values.id = initialValuesInfo._id;
        api.put("/users", values)
    }

    const updateUserStatusHandler = (values) => {
        delete values.lastActive
        values.id = initialValuesInfo._id;
        api.put("/users", values)
    }
    const refillHandle = (values) => {
        delete values._id;
        console.log("values", values);
        api.put(`/user-cart`, values)
    }
    return (
        <>
            <div class="border-b border-gray-200 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px text-2xl text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li class="me-2">
                        <a href="#"
                            onClick={() => setActiveTab("Profile")}
                            class={activeTab == "Profile"
                                ? "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg text-blue-600  border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                                : "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg border-transparent  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}
                        >
                            <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            Profile
                        </a>
                    </li>
                    <li class="me-2">
                        <a href="#"
                            onClick={() => setActiveTab("Order History")}
                            class={activeTab == "Order History"
                                ? "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg text-blue-600  border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                                : "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg border-transparent  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}
                        >
                            <svg class="w-4 h-4 me-2 text-gray-400 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>Order History
                        </a>
                    </li>
                    <li class="me-2">
                        <a href="#"
                            onClick={() => setActiveTab("Medical History")}
                            class={activeTab == "Medical History"
                                ? "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg text-blue-600  border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                                : "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg border-transparent  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"}>

                            <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                            </svg>Medical History
                        </a>
                    </li>
                    <li class="me-2">
                        <a href="#"
                            onClick={() => setActiveTab("Nots")}
                            class={activeTab == "Nots"
                                ? "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg text-blue-600  border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                                : "inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg border-transparent  hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                            }>
                            <svg class="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg>Nots
                        </a>
                    </li>

                </ul>
            </div >
            {activeTab == "Profile" && <div className=" max-w-270 mt-2">
                <Breadcrumb pageName="Patients Detail" />
                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Patients Info
                                </h3>
                            </div>
                            <div className="p-7">
                                <Formik
                                    initialValues={initialValuesInfo}
                                    validationSchema={validationSchemaInfo}
                                    onSubmit={onSubmitInfo}
                                    enableReinitialize={true}
                                >
                                    {({ errors, touched }) => {
                                        return (
                                            <Form >
                                                <div className="mb-5.5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="Username"
                                                    >
                                                        Username
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="username"
                                                        disabled={!isEditInfo}
                                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark -4 dark:text-white dark:focus:border-primary"
                                                        placeholder="Username"
                                                    />
                                                    <ErrMessage name="username" />
                                                </div>
                                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                                    <div className="w-full sm:w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="firstName"
                                                        >
                                                            First name
                                                        </label>
                                                        <div className="relative">
                                                            <span className="absolute left-4.5 top-4">
                                                                <svg
                                                                    className="fill-current"
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 20 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g opacity="0.8">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                                                            fill=""
                                                                        />
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                                                            fill=""
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                            <Field
                                                                type="text"
                                                                name="firstName"
                                                                disabled={!isEditInfo}
                                                                className="w-full rounded border border-stroke  bg-gray  py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                                placeholder="firstName"
                                                            />
                                                            <ErrMessage name="firstName" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="lastName"
                                                        >
                                                            Last name
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name="lastName"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                            placeholder="Last name"
                                                        />
                                                        <ErrMessage name="lastName" />
                                                    </div>
                                                </div>
                                                <div className="mb-5.5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="emailAddress"
                                                    >
                                                        Email Address
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-4.5 top-4">
                                                            <svg
                                                                className="fill-current"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g opacity="0.8">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                                                        fill=""
                                                                    />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                                                        fill=""
                                                                    />
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        <Field
                                                            type="email"
                                                            name="email"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark -4 dark:text-white dark:focus:border-primary"
                                                            placeholder="Email"
                                                        />
                                                        <ErrMessage name="email" />
                                                    </div>
                                                </div>
                                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                                    <div className="w-full sm:w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Age"
                                                        >
                                                            Age
                                                        </label>

                                                        <Field
                                                            type="number"
                                                            name="age"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                            placeholder="Age"
                                                        />
                                                        <ErrMessage name="age" />


                                                    </div>

                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Gender"
                                                        >
                                                            Gender
                                                        </label>

                                                        <Field as="select" name="gender" disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                        >
                                                            <option >Select gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </Field>
                                                        <ErrMessage name="gender" />
                                                    </div>
                                                </div>
                                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                                    <div className="w-full sm:w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Age"
                                                        >
                                                            Nationality
                                                        </label>

                                                        <Field
                                                            type="text"
                                                            name="nationality"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                            placeholder="Nationality"
                                                        />
                                                        <ErrMessage name="nationality" />

                                                    </div>

                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Phone Number"
                                                        >
                                                            Phone number
                                                        </label>

                                                        <Field
                                                            type="number"
                                                            name="phoneNumber"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                            placeholder="Phone Number"
                                                        />
                                                        <ErrMessage name="phoneNumber" />

                                                    </div>
                                                </div>

                                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Id Type"
                                                        >
                                                            ID Type
                                                        </label>

                                                        <Field as="select" name="idType" disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                        >
                                                            <option >Select Id</option>
                                                            <option value="passport">Passport</option>
                                                            <option value="nricno">NRIC NO</option>
                                                        </Field>
                                                        <ErrMessage name="idType" />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Id Number"
                                                        >
                                                            ID Number
                                                        </label>

                                                        <Field
                                                            type="text"
                                                            name="idNumber"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                            placeholder="Id number"
                                                        />
                                                        <ErrMessage name="idNumber" />


                                                    </div>

                                                </div>

                                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="postCode"
                                                        >
                                                            Post Code
                                                        </label>

                                                        <Field as="select" name="postCode" disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                        >
                                                            <option >Select Id</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                        </Field>
                                                        <ErrMessage name="postCode" />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Unit Code"
                                                        >
                                                            Unit Number
                                                        </label>

                                                        <Field
                                                            type="number"
                                                            name="unitCode"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                            placeholder="Unit Code"
                                                        />
                                                        <ErrMessage name="unitCode" />


                                                    </div>

                                                </div>

                                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                                                    <div className="w-full sm:w-1/2">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="Allergy"
                                                        >
                                                            Allergy
                                                        </label>

                                                        <Field as="select" name="isAllergy" disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                        >
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrMessage name="isAllergy" />
                                                    </div>

                                                    <div className="w-full sm:w-1/2 ">
                                                        <label
                                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                            htmlFor="g6PD"
                                                        >
                                                            G6PD
                                                        </label>

                                                        <Field as="select" name="isG6PD" disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
                                                        >
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </Field>
                                                        <ErrMessage name="isG6PD" />


                                                    </div>

                                                </div>

                                                <div className="mb-5.5">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="Username"
                                                    >
                                                        Address
                                                    </label>
                                                    <div className="relative">
                                                        <span className="absolute left-4.5 top-4">
                                                            <svg
                                                                className="fill-current"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                                        fill=""
                                                                    />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                                        fill=""
                                                                    />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_88_10224">
                                                                        <rect width="20" height="20" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </span>
                                                        <Field
                                                            rows={3}
                                                            as="textarea"
                                                            name="address"
                                                            disabled={!isEditInfo}
                                                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark -4 dark:text-white dark:focus:border-primary"
                                                            placeholder="Address"
                                                        />
                                                        <ErrMessage name="address" />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end gap-4.5">
                                                    <button
                                                        onClick={() => setIsEditInfo(!isEditInfo)}
                                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                        type="submit"
                                                    >
                                                        {isEditInfo ? "View" : "Edit"}
                                                    </button>
                                                    <button
                                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95  disabled:bg-opacity-60 disabled:cursor-not-allowed"
                                                        type="submit"
                                                        disabled={!isEditInfo}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 xl:col-span-2">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Your Photo
                                </h3>
                            </div>
                            <div className="p-7">
                                <form action="#">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-14 w-14 rounded-full">
                                            <Image
                                                src={"/images/user/user-03.png"}
                                                width={55}
                                                height={55}
                                                alt="User"
                                            />
                                        </div>
                                        <div>
                                            <span className="mb-1.5 text-black dark:text-white">
                                                Edit your photo
                                            </span>
                                            <span className="flex gap-2.5">
                                                <button className="text-sm hover:text-primary">
                                                    Delete
                                                </button>
                                                <button className="text-sm hover:text-primary">
                                                    Update
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        id="FileUpload"
                                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-boxdark -4 sm:py-7.5"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                        />
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                        fill="#3C50E0"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                        fill="#3C50E0"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                        fill="#3C50E0"
                                                    />
                                                </svg>
                                            </span>
                                            <p>
                                                <span className="text-primary">Click to upload</span> or
                                                drag and drop
                                            </p>
                                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                            <p>(max, 800 X 800px)</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="submit"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mt-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    User Active
                                </h3>
                            </div>
                            <div className="p-7 font-medium text-black dark:text-white">
                                <Formik
                                    initialValues={initialValuesActivities}
                                    validationSchema={validationSchemaActivities}
                                    onSubmit={updateUserStatusHandler}
                                    enableReinitialize={true}
                                >
                                    {({ errors, touched }) => {
                                        return (
                                            <Form >
                                                <div className="mb-4.5">
                                                    <div className="mb-4">
                                                        <label className="block text-black dark:text-white">Active<span className="text-meta-1">*</span></label>
                                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                            <Field as="select" name="isActive"
                                                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                            >
                                                                <option >Select Status</option>
                                                                <option value="true">Online</option>
                                                                <option value="false">Ofline</option>
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
                                                        <ErrMessage name="isActive" />
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex justify-end gap-4.5">
                                                        <button
                                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                                            type="submit"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                                            type="submit"
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <div className="grid grid-cols-5 gap-8 mt-8">
                    <div className="col-span-5 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Pricing  Information
                                </h3>
                            </div>
                            <div className="p-7">
                                <form action="#">
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="fullName"
                                            >
                                                Email
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.8">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                                                fill=""
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark -4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="fullName"

                                                    placeholder="Devid Jhon"
                                                    defaultValue="Devid Jhon"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="password"
                                            >
                                                Password
                                            </label>
                                            <input
                                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark -4 dark:text-white dark:focus:border-primary"
                                                type="text"
                                                name="password"
                                                placeholder="+990 3343 7865"
                                                defaultValue="+990 3343 7865"
                                            />
                                        </div>
                                    </div>



                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="submit"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            }
            {
                activeTab == "Medical History" &&
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
                    <div className="py-6 px-4 md:px-6 xl:px-7.5">
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            Medical History
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">

                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Date
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Doctor
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                    Description
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Items
                                    </th>
                                    <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-black">
                                        More Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prescriptions?.map((item) => (
                                        <tr className="text-left text-black dark:text-white">

                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                {moment(item.createdAt).calendar()}
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                {item?.doctor?.username}
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                {item.description}
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                                <ul>
                                                    {item?.items?.map((d, i) => (
                                                        <li>
                                                            {d.item.name} | qty-{d.qty}
                                                            {item?.items.length - 1 != i ? <hr /> : ""}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 flex">
                                                <Link href={`/dashboard/appointment/${item._id}`}>
                                                    <p className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                                                        Detail
                                                    </p>
                                                </Link>
                                                <button onClick={() => refillHandle(item)} className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                                                    Refill
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <Pagination meta={meta} /> */}
                </div>
            }
            {
                activeTab == "Order History" &&
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
                    <div className="py-6 px-4 md:px-6 xl:px-7.5">
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            Order History
                        </h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Order Id
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Date
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Price
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Payment Status
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                        Items
                                    </th>
                                    <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-black">
                                        More Details
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((item) => (
                                        <tr className="text-left text-black dark:text-white">
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                {
                                                    item?.user ? <ul>
                                                        <li className="uppercase">
                                                            {item?.user.firstName}  {item?.user.lastName}
                                                        </li>
                                                        <li>
                                                            {item.user.email}
                                                        </li>
                                                        <li>
                                                            {item.user._id}
                                                        </li>
                                                    </ul> : "email"
                                                }
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                {moment(item.createdAt).calendar()}
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                {item.amount}
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                {item.paymentStatus}
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                                <ul>
                                                    {item?.items?.map((d, i) => (
                                                        <li>
                                                            {d.item.name} | qty-{d.qty}
                                                            {item?.items.length - 1 != i ? <hr /> : ""}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                                <Link href={`/dashboard/orders/${item._id}`}>
                                                    <p className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                                                        Detail
                                                    </p>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <Pagination meta={meta} /> */}
                </div>
            }
            {
                activeTab == "Nots" &&
                <div className="bg-white mt-4">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Nots
                        </h3>
                    </div>
                    <div className='p-6'>
                        <textarea
                            value={initialValuesInfo?.note}
                            rows={6}
                            className=" w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark -4 dark:text-white dark:focus:border-primary"
                        ></textarea>
                    </div>
                </div>
            }
        </>
    );
};

export default PatientsDetailsPage;
