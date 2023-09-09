import React from 'react'
import SearchBox from '@/iComponents/MedicationList/SearchBox'
import EmailCard from '@/iComponents/MedicationList/EmailCard'
import DoctorConsultSection from '../footer/DoctorConsultSection'
import Footer from '../footer/Footer'

const MedicationList = () => {
  return (
    <div> 
        {/* Heading above search bar */}
        <h1 className="text-title-xxl text-center font-bold mt-12">
            All Medication List
        </h1>

        {/* Medication List search bar */}
        <SearchBox />
        {/* Medication List search bar */}


        {/* Medication List - Email containing CArd */}
         
            <EmailCard/>

        {/* Medication List - Email containing CArd */}
        <div className="mt-24">
        <DoctorConsultSection/>

        </div>
        <div className="bg-iTextPrimary px-10 py-7 mt-8">
          <Footer />
        </div>
    </div>
  )
}

export default MedicationList