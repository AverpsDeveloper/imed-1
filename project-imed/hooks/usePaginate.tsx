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

    const searchHandler = debounce(async (search) => {
        const params = new URLSearchParams(searchParams);
        search ? params.set("search", (search).toString())
            : params.delete("search")
        router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return {
        page, limit, search, searchHandler, router, pathname
    }
}

export default usePaginate;