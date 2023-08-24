import Dashboard from "@/components/Dashboard/Dashboard";
import AdminLayout from "./AdminLayout";

export default function Home() {
  return (
    <>
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
    </>
  );
}