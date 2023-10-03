import React from 'react';
function ProductList({ products }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Product Inventory</h2>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.productName}</td>
                <td className="px-4 py-2">{product.itemType}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">
                  <span
                    className={`${
                      product.status === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    } px-2 py-1 rounded-md`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md">
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