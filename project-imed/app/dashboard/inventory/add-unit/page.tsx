import React from 'react'
import AdminLayout from '@/app/dashboard/AdminLayout'
import AddUnit from '@/components/inventory/AddUnit'

const Inventory = () => {
  return (
    <AdminLayout>
    <div>
       
         <AddUnit/>
      
    </div>

  </AdminLayout>
  )
}

export default Inventory