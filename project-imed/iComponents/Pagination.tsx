import { usePathname, useRouter, useSearchParams } from 'next/navigation';
interface IPropType {
    meta: {
        page: number;
        limit: number;
        redirectUrl?: string;
        total: number
    }
}

const Pagination = ({ meta: { page, limit, total } }: IPropType) => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(+total / +limit);
    const pageDetail = {
        startIndex: +page <= pageCount ? page < 3 ? 0 : page - 3 : 0,
        endIndex: page <= pageCount ? pageCount <= (page + 2) ? pageCount : page + 2 : 4
    }

    const isNextDisabled = (): boolean => {
        return +page * +limit >= +total;
    };

    const isPrevDisabled = (): boolean => {
        return +page <= 1;
    };

    const pagination = [...Array(pageCount)].map((_, i) => i + 1)
        .slice(pageDetail.startIndex, pageDetail.endIndex);

    const handlePaginate = async (direction: 1 | -1 | 0, to?: number, pageLimit?: number) => {
        const params = new URLSearchParams(searchParams)
        if (direction === 1 && isNextDisabled()) {
            return;
        }

        if (direction === -1 && isPrevDisabled()) {
            return;
        }
        if (pageLimit) {
            params.set("limit", (pageLimit).toString())
        }
        params.set("page", (pageLimit ? 1 : to ? to : (+page + direction)).toString())
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className='flex justify-between items-center mt-5 mb-2'>
            <div>
                <label className='ml-2' htmlFor="rows">Rows</label>
                <select id='rows' onChange={(e) => handlePaginate(0, page, +e.target.value)}
                    value={limit}
                    className="mx-2 rounded border-[1.5px] border-stroke bg-transparent  font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value={10}>
                        10
                    </option>
                    <option value={25}>
                        25
                    </option>
                    <option value={50}>
                        50
                    </option>
                    <option value={100}>
                        100
                    </option>
                </select>

                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">{(+limit * (+page - 1)) + 1}</span> to
                    <span className="font-semibold text-gray-900 dark:text-white"> {(+total < (+limit * +page)) ? total : (+limit * +page)} </span> of
                    <span className="font-semibold text-gray-900 dark:text-white"> {+total} </span> Entries
                </span>
            </div>

            <div className="flex justify-start items-center text-sm">
                <button
                    onClick={() => handlePaginate(-1, 1)}
                    className={`${'bg-primary text-white px-2 mx-1 rounded '} ${isPrevDisabled() ? 'disabled' : ''
                        }`}>
                    First
                </button>
                <button
                    onClick={() => handlePaginate(-1, 0)}
                    className={`${'bg-primary  text-white px-2  mx-1 rounded '} ${isPrevDisabled() ? 'disabled' : ''
                        }`}>
                    Prev
                </button>
                {
                    pagination.map(d => (
                        <button key={d}
                            disabled={+page == d}
                            onClick={() => handlePaginate(0, d)}
                            className={` px-2 text-white bg-primary  rounded mx-1 hover:bg-primary hover:text-white ${page == d ? "bg-secondry text-white border border-2 border-black" : ""}`}>
                            {d}
                        </button>
                    ))
                }
                <button
                    onClick={() => handlePaginate(1, 0)}
                    className={`${'bg-primary px-2 text-white  mx-1 rounded '} ${isNextDisabled() ? 'disabled' : ''
                        }`}>
                    Next
                </button>
                <button
                    onClick={() => handlePaginate(1, pageCount)}
                    className={`${'bg-primary px-2 text-white mx-1 rounded '} ${isNextDisabled() ? 'disabled' : ''
                        }`}>
                    Last
                </button>
            </div>
        </div>
    );
};

export default Pagination;
