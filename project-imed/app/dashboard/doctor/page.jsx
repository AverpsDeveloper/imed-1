"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { FaHistory, FaEnvelope, FaPhone } from 'react-icons/fa';

const DoctorsListingPage = () => {

  const [genderFilter, setGenderFilter] = useState('all');
  const [sortByMonth, setSortByMonth] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const managers = [
    {
      id: 1,
      username: "jone",
      firstName: "jone",
      lastName: "singh",
      email: "email@gmail.com",
      gender: 'men',
      age: 35,
      description: 'Ultrasound in 3 days',
      profilePic: '/images/patient/patient1.jpg',
      date: new Date('2023-09-25'), // Date object for sorting
    },
    {
      id: 2,
      username: "jane",
      firstName: "Jane",
      lastName: "Smith",
      email: "email@gmail.com",
      gender: 'women',
      age: 28,
      description: 'Checkup scheduled',
      profilePic: '/images/patient/patient2.jfif',
      date: new Date('2023-09-20'), // Date object for sorting
    },
    // Add more patient objects here
  ];

  const filteredPatients = managers.filter((managers) => {
    if (genderFilter === 'all') return true;
    return managers.gender === genderFilter;
  });

  let sortedManager = [...filteredPatients];

  if (sortByMonth) {
    sortedManager.sort((a, b) => {
      // Assuming 'date' is the property to sort by
      return a.date - b.date;
    });
  } else {
    // Default sorting by some other criteria
    // sortedPatients.sort((a, b) => { ... });
  }

  if (searchTerm) {
    sortedManager = sortedManager.filter((managers) =>
      managers.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 ">
        <h1 className="text-2xl font-bold">Managers List</h1>
        <div className="flex items-center space-x-2">
          {/* <input
            type="text"
            className="border rounded px-2 py-1"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
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
            className={`px-4 py-2 rounded ${genderFilter === 'men' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            onClick={() => setGenderFilter('men')}
          >
            Men
          </button>
          <button
            className={`px-4 py-2 rounded ${genderFilter === 'women'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
              }`}
            onClick={() => setGenderFilter('women')}
          >
            Women
          </button>
        </div>
      </div>

      <div className="grid gap-4 p-6 rounded-sm border border-stroke bg-white shadow-md  dark:border-strokedark dark:bg-boxdark">
        {sortedManager.map((manager) => (
          <div
            key={manager.id}
            className="bg-white p-4 rounded-lg flex items-center border-stroke shadow-md space-x-4 bg-white dark:border-strokedark dark:bg-boxdark"
          >
            <img
              src={manager.profilePic}
              alt={manager.username}
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <Link href={`/dashboard/manager/${manager.username}`}>
                <p className="font-bold">({manager.username})</p>
                <p className="font-bold">{manager.firstName + " " + manager.lastName}</p>
                <p className="text-sm font-semibold text-gray-500">{` ${manager.age} years`}</p>
              </Link>
            </div>
            <p className="flex-grow text-sm ">{manager.description} </p>
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
      </div>
    </div>

  )
}

export default DoctorsListingPage;