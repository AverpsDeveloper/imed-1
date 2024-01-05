import { debounce } from "@/helper";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const usePaginate = () => {
    const router = useRouter();
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1
    const limit = searchParams.get('limit') || 10
    const search = searchParams.get('search') || "";
    const date = searchParams.get('date') || "";
    const product = searchParams.get('product') || "";
    const order = searchParams.get('order') || "";
    const meetingType = searchParams.get('meetingType') || "";

    const searchHandler = debounce(async (search) => {
        const params = new URLSearchParams(searchParams);
        search ? params.set("search", (search).toString())
            : params.delete("search");
        router.push(`${pathname}?${params.toString()}`);
    }, 500);

    const setSearchParmas = (key: string, value: any) => {
        const params = new URLSearchParams(searchParams);
        value ? params.set(key, (value).toString())
            : params.delete(key)
        router.push(`${pathname}?${params.toString()}`);
    }
    return {
        page, limit, search, searchHandler, router, pathname, date, product, order, meetingType, setSearchParmas
    }
}

export default usePaginate;