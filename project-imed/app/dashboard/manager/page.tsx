import React from 'react'

import ManagerList from '@/components/manager/ManagerList';

const ManagerListingPage = () => {

  const dummyManager = [
    {
      id: 1,
      name: 'John Doe',
      gender: 'men',
      age: 35,
      description: 'Ultrasound in 3 days',
      profilePic: '/images/patient/patient1.jpg',
      date: new Date('2023-09-25'), // Date object for sorting
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'women',
      age: 28,
      description: 'Checkup scheduled',
      profilePic: '/images/patient/patient2.jfif',
      date: new Date('2023-09-20'), // Date object for sorting
    },
    // Add more patient objects here
  ];


  return (
         <ManagerList managers={dummyManager}/>
         
)
}

export default ManagerListingPage;