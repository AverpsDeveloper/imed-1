import React from 'react'
import AdminLayout from '@/app/dashboard/AdminLayout'
import AddCategory from '@/components/inventory/AddCategory'

const Inventory = () => {
  return (
    <AdminLayout>
    <div>
       
         <AddCategory/>
      
    </div>

  </AdminLayout>
  )
}

export default Inventory