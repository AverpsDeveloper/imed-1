import { authOptions } from '@/libs/config/authOption';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const data = await getServerSession(authOptions);
    // console.log("aaadata", data);
    // if (!data) {
    //     redirect("/auth/signin");
    // }
    return (<section>
        {children}
    </section>)

}