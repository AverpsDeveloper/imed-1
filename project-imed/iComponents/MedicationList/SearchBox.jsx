import React, { useState } from 'react';
import { items } from '@/iComponents/MedicationList/data';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="w-full sm:w-2/3 mx-auto mb-12 mt-6">
        <div className="relative rounded-full ">
          <input
            type="text"
            placeholder="Search by brand name, generic name or by health conditions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full pl-10 py-2 pr-3 border border-blue-500  bg-iListBg focus:outline-none focus:ring focus:border-blue-700"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <AiOutlineSearch className="text-blue-500" />
          </div>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            className="border border-gray-300 pt-4 pb-4 rounded-lg bg-iListBg  text-center hover:bg-opacity-50 hover:bg-gray-200 bg-gradient-to-r from-sky-500 to-indigo-500"
          >
            {item.name}
          </li>
        ))}
      </ul>

      //ispe abhi kaam krna baaki hai
      {filteredItems.length > 6 && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white rounded-full px-6 py-3 hover:bg-blue-600"
            onClick={() => {
              // Handle the "See All Medications" button click here
            }}
          >
            See All Medications
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
