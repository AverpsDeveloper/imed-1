import Link from "next/link";
const PagesListing = () => {
    return (
            <div className="p-4 shadow-md drounded-m rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-2xl font-bold">Public Pages</h1>
                <Link href="/dashboard/inventory/products/add"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" /></svg>
                  </span>
                  Add Page
                </Link>
        </div>
        </div>
    )
}

export default PagesListing;
