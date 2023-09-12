import React from 'react'
import AdminLayout from '@/app/dashboard/AdminLayout'
import AddProduct from '@/components/inventory/AddProduct'

const Inventory = () => {
  return (
    <AdminLayout>
    <div>
       
       <AddProduct/>
      
    </div>

  </AdminLayout>
  )
}

export default Inventory