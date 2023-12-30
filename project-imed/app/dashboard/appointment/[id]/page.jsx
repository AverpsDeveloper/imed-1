"use client"
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import api from "@/http";

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
            {
           
                    <div key={appointDetail?._id} className='flex justify-between'>
                        <div>
                            <h1 className='font-bold text-2xl text-blue-600'>Doctor appointDetails</h1>
                            <h1>Add: {appointDetail?.doctor.address}</h1>
                            <h1>Age: {appointDetail?.doctor.age}</h1>
                            <h1>Available: {appointDetail?.doctor.availableHours}</h1>
                            <h1>Date: {moment(appointDetail?.doctor.createdAt).format("dd mm yyyy")}</h1>
                            <h1>Email: {appointDetail?.doctor.email}</h1>
                            <h1>First-Name: {appointDetail?.doctor.firstName}</h1>
                            <h1>Last-Name: {appointDetail?.doctor.lastName}</h1>
                            <h1>Gender: {appointDetail?.doctor.gender}</h1>
                            <h1>Phone No: {appointDetail?.doctor.phoneNumber}</h1>
                            <h1>Speciality: {appointDetail?.doctor.speciality}</h1>
                        </div>
                        <div>
                            <h1 className='font-bold text-2xl text-blue-600'>Patiant appointDetails</h1>
                            <h1>Add: {appointDetail?.user.address}</h1>
                            <h1>Age: {appointDetail?.user.age}</h1>
                            <h1>Date: {moment(appointDetail?.user.createdAt).format('dd mm yyyy')}</h1>
                            <h1>Email: {appointDetail?.user.email}</h1>
                            <h1>First-Name: {appointDetail?.user.firstName}</h1>
                            <h1>Last-Name: {appointDetail?.user.lastName}</h1>
                            <h1>Gender: {appointDetail?.user.gender}</h1>
                            <h1>Nationality: {appointDetail?.user.nationality}</h1>
                            <h1>Phone No: {appointDetail?.user.phoneNumber}</h1>
                        </div>
                    </div>
            }
        </div>
    )
}

export default page
