"use client"
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import api from "@/http";
import Link from 'next/link'

const page = () => {
    const params = useParams()
    console.log('params', params)

    const [appointDetail, setAppointDetail] = useState(null)
    console.log('appointDetailPage', appointDetail)


    useEffect(() => {
        const fetchappointDetail = async () => {
            const appointDetails = await api.get(`/appoint/${params.id}`)
            setAppointDetail(appointDetails.data.result.data)
        }
        fetchappointDetail()
    }, [])
    return (
        <div>
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
                <div className='flex items-center'>
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
            </div>
        </div>
    )
}

export default page
