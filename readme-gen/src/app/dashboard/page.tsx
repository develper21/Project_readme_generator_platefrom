import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardLayout() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Please sign in to access the dashboard.</p>
          <Link className="text-blue-600 underline" href="/auth/signin">Go to Sign In</Link>
        </div>
      </div>
    );
  }

  const user = { name: session.user?.name ?? session.user?.email ?? "User" };
  return (
    <div className="min-h-screen flex bg-slate-50">
      <DashboardSidebar user={user} />
      <div className="flex-1 flex flex-col">
        <DashboardTopbar user={user} notifCount={2} />
        <main className="p-6"></main>
      </div>
    </div>
  );
}
