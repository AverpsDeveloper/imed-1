"use client"
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import api from "@/http";
import Link from 'next/link'
import * as Yup from 'yup';
import Modal from '@/components/inventory/Modal'
import { FieldArray, Form, Formik, Field, ErrorMessage } from 'formik'
import AsyncSelect from 'react-select/async';


const page = () => {
    const params = useParams()
    console.log('params', params)
    const [prescription, setPrescription] = useState([])
    const [appointDetail, setAppointDetail] = useState(null)
    const [isPresOpen, setIsPresOpen] = useState(true)
    const [initialPresInfo, setInitialPresInfo] = useState({
        items: [
            {
                item: "", qty: "", desc: ""
            }
        ]
    });
    const [itemOptions, setItemOptions] = useState([]);
    console.log('appointDetailPage', appointDetail)


    useEffect(() => {
        const fetchappointDetail = async () => {
            const appointDetails = await api.get(`/appoint/${params.id}`)
            setAppointDetail(appointDetails.data.result.data)
        }
        fetchappointDetail()
    }, [])

    const loadOptionsHandler = async (search) => {
        try {
            const { data } = await api.get('/inventory', { params: { search } })
            const d = data.result.data.map(d => ({ value: d.name, label: d.name, id: d._id }))
            setItemOptions(d);
            return d;
        } catch (error) {
            return []
        }
    }
    return (
        <div>
            <Modal isVisibale={isPresOpen} className='w-[1000px] h-[84vh] overflow-auto' onClose={() => setIsPresOpen(false)}>
                {
                    prescription.slice(0, 2).map((p) => (
                        <div>
                            <p>Code Name: {p.codeName}</p>
                            <p>Name: {p.name}</p>
                            <hr />
                        </div>
                    ))
                }
                <br />
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Add Prescriptions
                        </h3>
                    </div>
                    <div className="p-7">
                        <Formik
                            initialValues={initialPresInfo}
                            validationSchema={Yup.object().shape({
                                items: Yup.array()
                                    .of(
                                        Yup.object().shape({
                                            item: Yup.string().required().label("Name"),
                                            qty: Yup.string().required().label("Quantity"),
                                            desc: Yup
                                                .string()
                                                .required()
                                                .label("Description") // these constraints take precedence
                                        })
                                    )
                                    .required(),
                                description: Yup.string().label("Note")
                            })
                            }
                            onSubmit={async (values, { resetForm }) => {
                                values.id = initialPresInfo._id;
                                await api.post("/prescription", {
                                    doctor: appointDetail?.doctor?._id,
                                    user: appointDetail?.user?._id,
                                    ...values
                                });
                                console.log("submint");
                                resetForm()
                                setIsPresOpen(false);
                            }}
                            enableReinitialize
                        >
                            {({ errors, touched, values }) => {
                                console.log("erorrs", errors);
                                console.log("values", values);
                                return (
                                    <Form>
                                        <div>
                                            <FieldArray
                                                name="items">
                                                {(arrayHelpers => (
                                                    <div className="">
                                                        {values?.items?.map((_, index) => (
                                                            <div key={index} className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                                                <div className="w-full sm:w-1/3">
                                                                    <label
                                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                        htmlFor={`items[${index}].item`}
                                                                    >
                                                                        Name
                                                                    </label>

                                                                    <Field
                                                                        name={`items[${index}].item`}
                                                                    >
                                                                        {({ field, form }) => (
                                                                            <AsyncSelect
                                                                                cacheOptions
                                                                                isClearable
                                                                                styles={{ control: (styles) => ({ ...styles, backgroundColor: 'white', padding: "6px" }) }}
                                                                                loadOptions={loadOptionsHandler}
                                                                                defaultOptions={itemOptions}
                                                                                onBlur={field.onBlur}
                                                                                // className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                                onChange={(selectedOption) => {
                                                                                    console.log("selectedOption", selectedOption)
                                                                                    return form.setFieldValue(
                                                                                        `items[${index}].item`,
                                                                                        selectedOption?.id,
                                                                                    )
                                                                                }}
                                                                                value={field.value ? itemOptions.find(d => d.id == field.value) : ""}
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                    <p className="text-red-500">
                                                                        <ErrorMessage
                                                                            name={`items[${index}].item`}
                                                                        />
                                                                    </p >
                                                                </div>

                                                                <div className="w-full sm:w-1/3">
                                                                    <label
                                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                        htmlFor={`items[${index}].qty`}
                                                                    >
                                                                        Quantity
                                                                    </label>

                                                                    <Field
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        type="text"
                                                                        name={`items[${index}].qty`}
                                                                        placeholder="Medicine Quentity"
                                                                        defaultValue=""
                                                                    />

                                                                    <p className="text-red-500">
                                                                        <ErrorMessage
                                                                            name={`items[${index}].qty`}
                                                                        />
                                                                    </p >
                                                                </div>
                                                                <div className="w-full sm:w-1/3">
                                                                    <label
                                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                                        htmlFor={`items[${index}].desc`}
                                                                    >
                                                                        Description
                                                                    </label>


                                                                    <Field
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        type="text"
                                                                        name={`items[${index}].desc`}
                                                                        placeholder="Medicien Desciption"

                                                                    />

                                                                    <p className="text-red-500">
                                                                        <ErrorMessage
                                                                            name={`items[${index}].desc`}
                                                                        />
                                                                    </p >
                                                                </div>
                                                                <div className="mt-8">
                                                                    <button
                                                                        type="button"
                                                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                                                        onClick={() => arrayHelpers.remove(index)}>
                                                                        -
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        )) ?? []}
                                                        <button
                                                            type="button"
                                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                                            onClick={() => arrayHelpers.push({ item: '', qty: '', desc: '' })}
                                                        >
                                                            + Add More Mediciens
                                                        </button>

                                                    </div>
                                                ))}
                                            </FieldArray>

                                        </div>
                                        <Field
                                            type="text"
                                            name={`description`}
                                            as={"textarea"}
                                            className="w-full mt-8 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="Note"
                                            defaultValue=""
                                        />

                                        <ErrorMessage className='text-red-500'
                                            name={`description`}
                                        />

                                        <div className="mt-2">
                                            <button
                                                // type="button"
                                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </Modal>
            <div className="p-4 shadow-md drounded-m rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between items-center mb-4 ">
                    <h2 className="text-2xl font-bold">Appointment Details</h2>
                    <h3 className="inline-flex items-center justify-center gap-2.5 rounded-full bg-green-600 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        Booking Date time : {moment(appointDetail?.date).calendar()}
                    </h3>
                </div>

                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="border-r font-bold text-2xl text-blue-600 min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                Doctor Details
                            </th>
                            <th className="font-bold text-2xl text-blue-600  min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                                Patient Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-r  min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                <table class="table-auto w-full">
                                    <tbody>
                                        <tr>
                                            <td class="font-semibold">First Name:</td>
                                            <td>{appointDetail?.doctor.firstName}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Last Name:</td>
                                            <td>{appointDetail?.doctor.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Age:</td>
                                            <td>{appointDetail?.doctor.age}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Gender:</td>
                                            <td>{appointDetail?.doctor.gender}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Speciality:</td>
                                            <td>{appointDetail?.doctor.speciality}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Email:</td>
                                            <td>{appointDetail?.doctor.email}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Phone No:</td>
                                            <td>{appointDetail?.doctor.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Address:</td>
                                            <td>{appointDetail?.doctor.address}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Available Hours:</td>
                                            <td>{appointDetail?.doctor.availableHours}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                <table class="table-auto w-full">
                                    <tbody>
                                        <tr>
                                            <td class="font-semibold">First Name:</td>
                                            <td>{appointDetail?.user.firstName}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Last Name:</td>
                                            <td>{appointDetail?.user.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Age:</td>
                                            <td>{appointDetail?.user.age}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Gender:</td>
                                            <td>{appointDetail?.user.gender}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Nationality:</td>
                                            <td>{appointDetail?.user.nationality}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Email:</td>
                                            <td>{appointDetail?.user.email}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Phone No:</td>
                                            <td>{appointDetail?.user.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Address:</td>
                                            <td>{appointDetail?.user.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex items-center mb-1'>
                    <div className='flex-1'>
                        <Link href={appointDetail?.meetDetial?.join_url ?? "https://zoom.us/j/92646564199?pwd=NTlldW80RmdIWlhocHVLYlRkV2llUT09"}
                            className="cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Join Meeting
                        </Link>
                    </div>
                    <div className='flex-1'>
                        <Link href={appointDetail?.meetDetial?.start_url ?? "https://zoom.us/j/92646564199?pwd=NTlldW80RmdIWlhocHVLYlRkV2llUT09"}
                            className="cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Start Meeting
                        </Link>
                    </div>
                </div>
                <hr />
                <div className='mt-8 flex'>
                    <div className=''>
                        <button
                            className="mx-2 cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Update
                        </button>
                    </div>
                    <div className=''>
                        <button
                            onClick={() => setIsPresOpen(true)}
                            className="mx-2 cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Prescription
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
