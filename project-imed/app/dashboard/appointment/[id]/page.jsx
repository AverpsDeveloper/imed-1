"use client"
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams()
    console.log('params', params)
    const [detailPage, setDetailPage] = useState([])
    console.log('detailPage', detailPage)


    useEffect(() => {
        const fetchDetail = async () => {
            const details = await axios.get('/api/appoint')
            setDetailPage(details.data.result.data)
        }
        fetchDetail()
    }, [])
    return (
        <div>
            {
                detailPage.map((detail, ind) => (
                    <div key={detail._id} className='flex justify-between'>
                        <div>
                            <h1 className='font-bold text-2xl text-blue-600'>Doctor Details</h1>
                            <h1>Add: {detail.doctor.address}</h1>
                            <h1>Age: {detail.doctor.age}</h1>
                            <h1>Available: {detail.doctor.availableHours}</h1>
                            <h1>Date: {moment(detail.doctor.createdAt).format("dd mm yyyy")}</h1>
                            <h1>Email: {detail.doctor.email}</h1>
                            <h1>First-Name: {detail.doctor.firstName}</h1>
                            <h1>Last-Name: {detail.doctor.lastName}</h1>
                            <h1>Gender: {detail.doctor.gender}</h1>
                            <h1>Phone No: {detail.doctor.phoneNumber}</h1>
                            <h1>Speciality: {detail.doctor.speciality}</h1>
                        </div>
                        <div>
                            <h1 className='font-bold text-2xl text-blue-600'>Patiant Details</h1>
                            <h1>Add: {detail.user.address}</h1>
                            <h1>Age: {detail.user.age}</h1>
                            <h1>Date: {moment(detail.user.createdAt).format('dd mm yyyy')}</h1>
                            <h1>Email: {detail.user.email}</h1>
                            <h1>First-Name: {detail.user.firstName}</h1>
                            <h1>Last-Name: {detail.user.lastName}</h1>
                            <h1>Gender: {detail.user.gender}</h1>
                            <h1>Nationality: {detail.user.nationality}</h1>
                            <h1>Phone No: {detail.user.phoneNumber}</h1>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default page
