"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination, useFilters } from 'react-table';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import XLSX from 'xlsx';

const StockReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get('your-api-url')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { Header: 'Serial No.', accessor: 'serialNo' },
    { Header: 'Product Name', accessor: 'productName' },
    { Header: 'Category', accessor: 'category' },
    { Header: 'Batch ID', accessor: 'batchId' },
    { Header: 'Brand Name', accessor: 'brandName' },
    { Header: 'Total Qty', accessor: 'totalQty' },
    { Header: 'Available Qty', accessor: 'availableQty' },
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Initial page size and index
    },
    useFilters,
    usePagination
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stock Report</h1>
      <div className="mb-4">
        <CSVLink
          data={data}
          headers={columns.map(column => ({ label: column.Header, key: column.accessor }))}
          filename="stock-report.csv"
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Export to CSV
          </button>
        </CSVLink>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={exportToExcel}
        >
          Export to Excel
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={exportToPDF}
        >
          Export to PDF
        </button>
      </div>
      <table {...getTableProps()} className="table-auto">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="my-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </div>
  );

  function exportToExcel() {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stock Report');
    XLSX.writeFile(wb, 'stock-report.xlsx');
  }

  function exportToPDF() {
    const doc = new jsPDF();
    const columnsData = columns.map(column => column.Header);
    const rowsData = data.map(row => columns.map(column => row[column.accessor]));

    doc.autoTable({
      head: [columnsData],
      body: rowsData,
    });
    doc.save('stock-report.pdf');
  }
};

export default StockReport;





