"use client"
import React from 'react'
import Header from '@/iComponents/Header/Header'
import MedicationList from '@/iComponents/MedicationList/MedicationList'

const Medication = () => {
  return (
     <div className = "bg-white">
      <Header/>
       <MedicationList/>
     </div>
  )
}

export default Medication