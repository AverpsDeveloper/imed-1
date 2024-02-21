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
import BookAppointModal from "@/components/modal/BookAppointModal"

const page = () => {
    const params = useParams()
    console.log('params', params)
    const [prescription, setPrescription] = useState([])
    const [appointDetail, setAppointDetail] = useState(null)
    const [isPresOpen, setIsPresOpen] = useState(false)
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
    const [prescriptionType, setPrescriptionType] = useState(false)
    const [initialPresInfo, setInitialPresInfo] = useState({
        items: [
            {
                item: "", qty: "", desc: "", endDate: prescriptionType == "onetime" ? moment().add("h", 24).format("YYYY-MM-DD") : ""
            }
        ]
    });
    const [itemOptions, setItemOptions] = useState([]);
    const [appoinStatus, setAppointStatus] = useState("");
    const [isNote, setIsNote] = useState(false);
    console.log("appointDetail", appointDetail)

    useEffect(() => {
        const fetchappointDetail = async () => {
            const appointDetails = await api.get(`/appoint/${params.id}`)
            setAppointDetail(appointDetails.data.result.data);
            setAppointStatus(appointDetails.data.result.data.appoimentStatus)
        }
        fetchappointDetail()
    }, []);

    const updateAppointStatus = () => {
        api.put(`/appoint/${params.id}`, { appoimentStatus: appoinStatus })
    }

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
            <Modal isVisibale={isPresOpen} className='w-[900px] h-[84vh] overflow-auto' onClose={() => setIsPresOpen(false)}>
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
                                            endDate: Yup.string().required().label("End Date"),
                                            desc: Yup
                                                .string()
                                                .required()
                                                .label("Description") // these constraints take precedence
                                        })
                                    )
                                    .required(),
                                description: Yup.string().label("Description"),
                                note: Yup.string().label("Note")
                            })
                            }
                            onSubmit={async (values, { resetForm }) => {
                                values.id = initialPresInfo._id;
                                console.log("valuesSSSSSS", values)
                                if (prescriptionType == "subscription") {
                                    await api.post("/prescription", {
                                        doctor: appointDetail?.doctor?._id,
                                        user: appointDetail?.user?._id,
                                        ...values
                                    });
                                }
                                if (prescriptionType == "onetime") {
                                    await api.put(`/user-cart`, {
                                        user: appointDetail?.user?._id,
                                        items: values.items
                                    })
                                }

                                console.log("submint");
                                resetForm()
                                setIsPresOpen(false);
                                setPrescriptionType("");
                            }}
                            enableReinitialize
                        >
                            {({ errors, touched, values, setFieldValue }) => {
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
                                                                        placeholder="Medicine Quantity "
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
                                                                        htmlFor={`items[${index}].endDate`}
                                                                    >
                                                                        End Date
                                                                    </label>

                                                                    <Field
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                                        type="date"
                                                                        disabled={prescriptionType == "onetime"}
                                                                        name={`items[${index}].endDate`}
                                                                        placeholder="Medicine Quantity"
                                                                        defaultValue=""
                                                                    />

                                                                    <p className="text-red-500">
                                                                        <ErrorMessage
                                                                            name={`items[${index}].endDate`}
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
                                                                        placeholder="Medicine Description "

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
                                                            onClick={() => arrayHelpers.push({ item: '', qty: '', desc: '', endDate: prescriptionType == "onetime" ? moment().add("h", 24).format("YYYY-MM-DD") : "" })}
                                                        >
                                                            + Add More Medicines
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
                                            placeholder="Description"
                                            defaultValue=""
                                        />

                                        <ErrorMessage className='text-red-500'
                                            name={`description`}
                                        />
                                        <button
                                            type="button"
                                            className="mt-4 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                                            onClick={() => setIsNote(!isNote)}
                                        >
                                            + Add Note
                                        </button>
                                        {
                                            isNote ? <Field
                                                type="text"
                                                name={`note`}
                                                as={"textarea"}
                                                className="w-full mt-4 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                placeholder="Note"
                                                defaultValue=""
                                            /> : null
                                        }

                                        <div className="mt-2 flex">
                                            <Field
                                                onChange={(e) => {
                                                    values.items.forEach((element, i) => {
                                                        if (prescriptionType == "onetime") {
                                                            setFieldValue(`items[${i}].endDate`, moment().add("h", 24).format("YYYY-MM-DD"))
                                                        }
                                                    });
                                                    setPrescriptionType(e.target.value)
                                                }
                                                }

                                                as="select"
                                                className="w-1/3 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                type="date"
                                                name={`prescriptionType`}
                                                placeholder="Medicine Quentity"
                                                defaultValue=""
                                            >
                                                <option>
                                                    Select Prescription Type
                                                </option>
                                                <option value="subscription">
                                                    Subscription
                                                </option>
                                                <option value="onetime">
                                                    One time
                                                </option>
                                            </Field>
                                            <button
                                                disabled={!prescriptionType}
                                                // type="button"
                                                className="ml-2 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95 disabled:opacity-40"
                                            >
                                                {
                                                    prescriptionType == "subscription"
                                                        ? "Add Subscription" : prescriptionType == "onetime"
                                                            ? "Add To Cart" : "Submit"
                                                }
                                            </button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </Modal>
            
            <BookAppointModal isVisibale={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} selectedPatiantId={appointDetail?.user?._id} />
            <div className="p-4 shadow-md drounded-m rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex justify-between items-center mb-4 ">
                    <h2 className="text-2xl font-bold">Appointment Details</h2>
                    <Link href={`/dashboard/patients/${appointDetail?.user?._id ?? 1}`}
                        className="cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Pation Detail
                    </Link>
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
                                            <td class="font-semibold">Username:</td>
                                            <td>{appointDetail?.doctor.username}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">First Name:</td>
                                            <td>{appointDetail?.doctor.firstName}</td>
                                        </tr>
                                        <tr>
                                            <td class="font-semibold">Last Name:</td>
                                            <td>{appointDetail?.doctor.lastName}</td>
                                        </tr>

                                        <tr>
                                            <td class="font-semibold">Speciality:</td>
                                            <td>{appointDetail?.doctor.speciality}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                            <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                <table class="table-auto w-full">
                                    <tbody>
                                        <tr>
                                            <td class="font-semibold">Username:</td>
                                            <td>{appointDetail?.user.username}</td>
                                        </tr>
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

                <div className='mt-8 flex float-right'>
                    <div className=''>
                        <button onClick={() => setIsAppointmentOpen(true)}
                            className="mx-2 cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Reschedule
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
                <div className="m-8">
                    <h3 className="font-medium text-xl text-black dark:text-white">
                        Updata Appointment States
                    </h3>
                    <select
                        value={appoinStatus}
                        className=" mt-4 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        onChange={e => setAppointStatus(e.target.value)}
                    >
                        <option>
                            Select status
                        </option>
                        <option value={'Pre-registration'}>
                            Pre-registration
                        </option>
                        <option value={'Checked In'}>
                            Checked In
                        </option>
                        <option value={'In Consult'}>
                            In Consult
                        </option>
                        <option value={'Pending delivery'} >
                            Pending delivery
                        </option>
                        <option value={'Completed'} >
                            Completed
                        </option>
                    </select>
                    <button
                        className="mx-2 cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        onClick={updateAppointStatus}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default page
