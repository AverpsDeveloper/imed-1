"use client"

import api from "@/http"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaHistory, FaEnvelope, FaPhone } from 'react-icons/fa';
import Pagination from '@/iComponents/Pagination';
import usePaginate from "@/hooks/usePaginate";
import { debounce } from "@/helper";
import { useSession } from "next-auth/react";
import Modal from "@/components/inventory/Modal";
import moment from "moment";

const PatientListingPage = () => {
  const [genderFilter, setGenderFilter] = useState('all');
  const [patient, setPatient] = useState([])
  const { page, limit, search, searchHandler } = usePaginate();
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 10 });
  const [open, setOpen] = useState(false)
  const [selectedPatiantId, setSelectedPatiantId] = useState()
  const [appointment, setAppointment] = useState({})
  const [isVisibale, setIsvisible] = useState(false)
  const [value, setValue] = useState();
  const [selectedDate, setSelectedDate] = useState()
  const [doctor, setDoctor] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState()
  console.log('selectedDoctor', selectedDoctor)

  const { data: session, status } = useSession();


  const isDoctorLogin = session?.user?.role === "DOCTOR"

  console.log('appointment', appointment)

  useEffect(() => {
    if (isDoctorLogin) {
      setSelectedDoctor(session.user)
    }

  }, [session?.user])


  const CheackAvaibility = async () => {
    const result = await api.get(`/doctors-appoint/${selectedDoctor._id}`, {
      params: {
        date: selectedDate
      }
    })

    console.log('cAvaibility', result)
    setAppointment(result.data?.result?.data)
  }


  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorInfo = await api.get('/users-admin', {
        params: {
          role: "DOCTOR",
        }
      })
      console.log('doctor', doctor)
      setDoctor(doctorInfo.data.result.data)
    }

    fetchDoctor()


  }, [isDoctorLogin])


  useEffect(() => {
    if (selectedDoctor) {
      const doctorId = async () => {
        const dId = await api.get(`/doctors-appoint/${selectedDoctor._id}`)
        setAppointment(dId.data?.result?.data)
      }

      doctorId()
    }


  }, [open, selectedDoctor])

  useEffect(() => {
    api.get('/users', {
      params: {
        page,
        limit,
        search,
        
      }
    })
      .then((response) => {
        setPatient(response.data.result.data);
        setMeta(response.data.result.meta);
      })

  }, [page, limit, search]);

  const filteredPatients = patient.filter((patient) => {
    if (genderFilter === 'all') return true;
    return patient.gender === genderFilter;
  });

  const handleCancel = () => {
    setIsvisible(false)
  };

  const handleOk = async () => {


    if (selectedDate) {
      const createAppointment = async () => {
        const cAppointment = await api.post('/appoint', {
          doctor: selectedDoctor._id,
          user: selectedPatiantId,
          date: selectedDate
        })

        console.log(cAppointment)
      }
      await createAppointment()
      setIsvisible(false);
    }
  };

  const handleClickListItem = (id) => {
    setIsvisible(true)
    setSelectedPatiantId(id)
  };


  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 ">
        <h1 className="text-2xl font-bold"></h1>
        <div className="flex items-center space-x-2">

          <div class="hidden sm:block shadow-md px-4 py-4 rounded ">
            <div class="relative">
              <button class="absolute left-0 top-1/2 -translate-y-1/2" fdprocessedid="x8uxg">
                <svg class="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill="">
                  </path>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill="">
                  </path>
                </svg>
              </button>
              <input
                defaultValue={search}
                onChange={e => searchHandler(e.target.value)}
                placeholder="Search by username..." class="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125" type="text" fdprocessedid="ai7g3k" />
            </div>
          </div>
          <button
            onClick={() => setGenderFilter("all")}
            className={`px-4 py-2 rounded ${genderFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setGenderFilter("male")}
            className={`px-4 py-2 rounded ${genderFilter === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            Male
          </button>
          <button
            onClick={() => setGenderFilter("female")}
            className={`px-4 py-2 rounded ${genderFilter === 'female'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
              }`}
          >
            Female
          </button>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Patients List
          </h4>
        </div>
        <div className="overflow-x-auto">
          <Modal isVisibale={isVisibale} >
            <div className="overflow-x-auto p-5">

              {
                !isDoctorLogin ? <div>

                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Doctor</label>
                  <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSelectedDoctor(() => doctor.find(d => d._id == e.target.value))}>
                    <option>Select Doctor</option>
                    {
                      doctor.map((doc) => (
                        <option value={doc._id}>{doc.username}</option>
                      ))
                    }

                  </select>
                </div> : ''
              }
              <h1>Doctor: {selectedDoctor?.username}   {selectedDoctor?.firstName}   {selectedDoctor?.lastName}</h1>
              <br />
              <div>
                <input type='date' className='border p-2 rounded-xl ' min={moment().format('yyyy-mm-dd')} onChange={(e) => setSelectedDate(e.target.value)} />
                <button className="ml-4 inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-10 leading-4 cursor-pointer" onClick={CheackAvaibility}>
                  Cheack Avaibility
                </button>
              </div>
              <br />
              <div className='flex justify-space-between'>
                <p className='font-bold'>Appointment -</p>
                <p>{appointment?.apointDate}</p>
              </div>
              <div>
                {
                  appointment?.apointments?.map((appo) => (
                    <div key={appo.apointDate}>
                      <div className='flex justify-between'>
                        <p>Start- {moment(appo.start).format("LT")}</p>
                        <p>End- {moment(appo.end).format("LT")}</p>
                      </div>
                      <br />
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                        {appo?.slots?.map((appoin) => (

                          appoin?.isAvailable ?
                            <div className="flex items-center gap-2" key={appoin?.time}>
                              <input type="radio" name={'date'} value={appoin?.time} onChange={(e) => setSelectedDate(e.target.value)} className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              <h1>{moment(appoin?.time).format('LT')}</h1>
                            </div>
                            :
                            <div className="flex items-center gap-2" key={appoin?.time}>

                              <input type="radio" checked disabled className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                name={moment(appoin?.time).format("LT")} />
                              <h1 className="text-gray-100">{moment(appoin?.time).format('LT')}</h1>
                            </div>
                        ))}

                      </div>
                    </div>
                  ))
                }

              </div>
              <div className="flex justify-end gap-3">
                <button className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-10 leading-4 cursor-pointer" autoFocus onClick={handleCancel}> Cancel </button>
                <button className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-10 leading-4 cursor-pointer" onClick={handleOk}>Book Appointment</button>
              </div>
            </div>
          </Modal>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                  Avatar
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                  Full Name
                </th>
                <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-black">
                  Username
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {patient.map((patient, index) => (
                <tr key={patient._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-9 xl:pl-11">
                    <Link href={`/dashboard/patient/${patient.username}`}>
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="h-12.5 w-15 rounded-md">
                          <Image
                            src={patient.profilePic || "/images/logo/logo-icon.svg"}
                            width={60}
                            height={50}
                            alt="patient"
                          />
                        </div>
                        <h5 className="font-medium text-black dark:text-white">

                        </h5>
                      </div>
                    </Link>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-9 xl:pl-11">
                    <Link href={`/dashboard/patient/${patient.username}`}>
                      <h5 className="font-medium text-black dark:text-white">
                        {patient.firstName + " " + patient.lastName}
                      </h5>
                    </Link>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {patient.username}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      <Link href={`mailto:${patient.email}`}><FaEnvelope title={`${patient.email}`} />{patient.email}</Link>
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link href={`/dashboard/patients/${patient._id}`}>
                        <p className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                          Detail
                        </p>
                      </Link>
                      <p className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-10 leading-4 cursor-pointer" onClick={() => handleClickListItem(patient._id)}>
                        Book Appointment
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination meta={meta} />
      </div>
    </div>

  )
}

export default PatientListingPage;