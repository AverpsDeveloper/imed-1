import React from 'react'
import AdminLayout from '@/app/dashboard/AdminLayout'
import UnitList from '@/components/inventory/UnitList'

const Inventory = () => {
  return (
    <AdminLayout>
    <div>
       
         <UnitList/>
      
    </div>

  </AdminLayout>
  )
}

export default Inventory