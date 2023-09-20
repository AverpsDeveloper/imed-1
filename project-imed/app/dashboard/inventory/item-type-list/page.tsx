import React from 'react'
import AdminLayout from '@/app/dashboard/AdminLayout'
import ItemTypeList from '@/components/inventory/ItemTypeList'

const Inventory = () => {

  const dummyData = [
    { id: 1, name: 'Unit A', status: 'Active' },
    { id: 2, name: 'Unit B', status: 'Inactive' },
    { id: 3, name: 'Unit C', status: 'Active' },
  ];

  return (
    <AdminLayout>
    <div>
    
         <ItemTypeList categories={dummyData} />
      
    </div>

  </AdminLayout>
  )
}

export default Inventory