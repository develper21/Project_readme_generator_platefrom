import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const user = { name: session.user?.name ?? session.user?.email ?? "User" };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <DashboardSidebar user={user} />
      <div className="flex-1 flex flex-col">
        <DashboardTopbar user={user} notifCount={2} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}