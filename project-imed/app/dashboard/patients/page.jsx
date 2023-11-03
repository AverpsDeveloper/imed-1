"use client"

import api from "@/http"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaHistory, FaEnvelope, FaPhone } from 'react-icons/fa';
import Pagination from '@/iComponents/Pagination';
import usePaginate from "@/hooks/usePaginate";
import { debounce } from "@/helper";

const DoctorListingPage = () => {
  const [genderFilter, setGenderFilter] = useState('all');
  const [doctors, setDoctors] = useState([])
  const { page, limit, search, searchHandler } = usePaginate();
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 10 });

  useEffect(() => {
    api.get('/users-admin', {
      params: {
        role: "DOCTOR",
        page,
        limit,
        search,
      }
    })
      .then((response) => {
        setDoctors(response.data.result.data);
        setMeta(response.data.result.meta);
      })

  }, [page, limit, search]);

  const filteredPatients = doctors.filter((doctors) => {
    if (genderFilter === 'all') return true;
    return doctors.gender === genderFilter;
  });

  let sortedDoctor = [...filteredPatients];


  const handleSearch = debounce(async (search) => {
    const params = new URLSearchParams(searchParams);
    search ? params.set("search", (search).toString())
      : params.delete("search")
    router.push(`${pathname}?${params.toString()}`);
  }, 500);




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
                onChange={e => handleSearch(e.target.value)}
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
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                  Profile
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                  Full Name
                </th>
                <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-black">
                  Username
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                  Gender
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black">
                  Age
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
              {doctors.map((doctor, index) => (
                <tr key={doctor._id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-9 xl:pl-11">
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
                        <h5 className="font-medium text-black dark:text-white">

                        </h5>
                      </div>
                    </Link>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-9 xl:pl-11">
                    <Link href={`/dashboard/doctor/${doctor.username}`}>
                      <h5 className="font-medium text-black dark:text-white">
                        {doctor.firstName + " " + doctor.lastName}
                      </h5>
                    </Link>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {doctor.username}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                    <h5 className="font-medium text-black dark:text-white">
                      {doctor.gender}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {doctor.age}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      <Link href={`mailto:${doctor.email}`}><FaEnvelope title={`${doctor.email}`} />{doctor.email}</Link>
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link href={`/dashboard/doctor/${doctor.username}`}>
                        <p className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                          Detail
                        </p>
                      </Link>
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

export default DoctorListingPage;