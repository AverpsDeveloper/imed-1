"use client"

import React, { useState } from 'react';
import { FaHistory, FaEnvelope, FaPhone } from 'react-icons/fa';

const DoctorsList = ({ doctors }:any) => {
  const [genderFilter, setGenderFilter] = useState('all');
  const [sortByMonth, setSortByMonth] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = doctors.filter((doctors:any) => {
    if (genderFilter === 'all') return true;
    return doctors.gender === genderFilter;
  });

  let sortedPatients = [...filteredPatients];

  if (sortByMonth) {
    sortedPatients.sort((a, b) => {
      // Assuming 'date' is the property to sort by
      return a.date - b.date;
    });
  } else {
    // Default sorting by some other criteria
    // sortedPatients.sort((a, b) => { ... });
  }

  if (searchTerm) {
    sortedPatients = sortedPatients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Doctor List</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="border rounded px-2 py-1"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className={`px-4 py-2 rounded ${
              genderFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setGenderFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              genderFilter === 'men' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setGenderFilter('men')}
          >
            Men
          </button>
          <button
            className={`px-4 py-2 rounded ${
              genderFilter === 'women'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => setGenderFilter('women')}
          >
            Women
          </button>
        </div>
      </div>

      <div className="grid  gap-4">
        {sortedPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
          >
            <img
              src={patient.profilePic}
              alt={patient.name}
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <p className="font-bold">{patient.name}</p>
              <p className="text-sm font-semibold text-gray-500">{` ${patient.age} years`}</p>
            </div>
            <p className="flex-grow text-sm ">{patient.description} </p>
            <div className="flex items-center space-x-2">
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
  );
};

export default DoctorsList;



