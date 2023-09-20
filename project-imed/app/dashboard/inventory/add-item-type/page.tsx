import React from 'react'
import AdminLayout from '@/app/dashboard/AdminLayout'
import AddItemType from '@/components/inventory/AddItemType'

const Inventory = () => {
  return (
    <AdminLayout>
    <div>
       
         <AddItemType/>
      
    </div>

  </AdminLayout>
  )
}

export default Inventory