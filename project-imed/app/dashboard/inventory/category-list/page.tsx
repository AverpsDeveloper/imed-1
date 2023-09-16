import React from 'react'
import AdminLayout from '@/app/dashboard/AdminLayout'
import CategoryList from '@/components/inventory/CategoryList'

const Inventory = () => {
  return (
    <AdminLayout>
    <div>
       
         <CategoryList/>
      
    </div>

  </AdminLayout>
  )
}

export default Inventory