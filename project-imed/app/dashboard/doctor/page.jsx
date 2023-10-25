"use client"

import api from "@/http"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaHistory, FaEnvelope, FaPhone } from 'react-icons/fa';

const DoctorListingPage = () => {

  const [genderFilter, setGenderFilter] = useState('all');
  const [sortByMonth, setSortByMonth] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctorsData] = useState([])
  useEffect(() => {
    api.get('/users-admin', { params: { role: "DOCTOR" } })
      .then((response) => {
        setDoctorsData(response.data.result.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  const filteredPatients = doctors.filter((doctors) => {
    if (genderFilter === 'all') return true;
    return doctors.gender === genderFilter;
  });

  let sortedDoctor = [...filteredPatients];

  if (sortByMonth) {
    sortedDoctor.sort((a, b) => {
      // Assuming 'date' is the property to sort by
      return a.date - b.date;
    });
  } else {
    // Default sorting by some other criteria
    // sortedPatients.sort((a, b) => { ... });
  }

  if (searchTerm) {
    sortedDoctor = sortedDoctor.filter((doctors) =>
      doctors.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by username..." class="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125" type="text" fdprocessedid="ai7g3k" />
            </div>
          </div>
          <button
            className={`px-4 py-2 rounded ${genderFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setGenderFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${genderFilter === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setGenderFilter('male')}
          >
            Male
          </button>
          <button
            className={`px-4 py-2 rounded ${genderFilter === 'female'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
              }`}
            onClick={() => setGenderFilter('female')}
          >
            Female
          </button>
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
          Doctors List
          </h4>
        </div>

        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Profile</p>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="font-medium">Username</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Gender</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Age</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Contact</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Action</p>
          </div>
        </div>

        {sortedDoctor.map((doctor, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-2 flex items-center">
            <Link href={`/dashboard/doctor/${doctor.username}`}> 
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-12.5 w-15 rounded-md">
                  <Image
                    src={doctor.profilePic || "/images/logo/logo-icon.svg"}
                    width={60}
                    height={50}
                    alt="doctor"
                  />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {doctor.firstName + " " + doctor.lastName}
                </p>
              </div>
              </Link>
            </div>
            <div className="col-span-2 hidden items-center sm:flex hover:font-bold hover:bg-opacity-90 lg:px-8 xl:px-10">
            <Link href={`/dashboard/doctor/${doctor.username}`}> 
              <p className="text-sm text-black dark:text-white">
                {doctor.username}
              </p>
            </Link>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {doctor.gender}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
                {doctor.age}
              </p>
            </div>
            <div className="col-span-1 gap-5 flex items-center">
              
              <button className="text-blue-500">
              <a href={`mailto:${doctor.email}`}><FaEnvelope title={`${doctor.email}`}/></a>
                
              </button>
              <button className="text-blue-500">
              <a href={`tel:${doctor.phoneNumber}`}><FaPhone title={`${doctor.phoneNumber}`}/></a>
              </button>
            </div>
            <div className="col-span-1 flex items-center">
            <Link href={`/dashboard/doctor/${doctor.username}`}>
                <p className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                  Detail
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid gap-4 p-6 rounded-sm border border-stroke bg-white shadow-md  dark:border-strokedark dark:bg-boxdark">
        {sortedDoctor.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white p-4 rounded-lg flex items-center border-stroke shadow-md space-x-4 bg-white dark:border-strokedark dark:bg-boxdark"
          >
            <img
              src={doctor.profilePic || "/images/logo/logo-icon.svg"}
              alt={doctor.username}
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <Link href={`/dashboard/doctor/${doctor.username}`}>
                <p className="font-bold">({doctor.username})</p>
                <p className="font-bold">{doctor.firstName + " " + doctor.lastName}</p>
                <p className="text-sm font-semibold text-gray-500">{` ${doctor.age} years`}</p>
              </Link>
            </div>
            <p className="flex-grow text-sm ">{doctor.description} </p>
            <div className="flex items-center space-x-7">
              <div />
              <button className="text-blue-500">
                <FaHistory />
              </button>
              <button className="text-blue-500">
                <FaEnvelope />
              </button>
              <button className="text-blue-500">
                <FaPhone />
              </button>

            </div>
          </div>
        ))}
      </div> */}
    </div>

  )
}

export default DoctorListingPage;