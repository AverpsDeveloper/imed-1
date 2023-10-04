"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define your API endpoint URL
    const apiUrl = '/api/inventory';

    // Fetch product data using Axios
    axios
      .get(apiUrl)
      .then((response) => {        
        setProducts(response.data.result.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [products]);


  function productDeleteHandler(id:string){
    axios.delete("/api/inventory",{data:{id}}).then(({data}) => {
      toast.success(data.result.message);
    }).catch((err) => {
      toast.success('There was an error. Please try again');
    })
  }
  const router = useRouter();
  function productEditHandler(id:string){
    if(id){
      router.push(`/dashboard/inventory/products/add?id=${id}`)
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products Listing</h1>
        <Link href="/dashboard/inventory/products/add"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" /></svg>
          </span>
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Item Type</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product :any,index) => (
              <tr key={product._id}>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.type}</td>
                <td className="px-4 py-2">{product.category[0].name}</td>
                <td className="px-4 py-2">
                  <span
                    className={`${
                      product.isActive === true
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    } px-2 py-1 rounded-md`}
                  >
                    {product.isActive == "true" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button onClick={()=> productEditHandler(product._id)} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                    Edit
                  </button>
                  <button onClick={()=>productDeleteHandler(product._id)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;