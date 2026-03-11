import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex bg-[#020202] min-h-screen text-[#F2F2F2]">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-[240px] flex flex-col p-4 md:p-6 gap-6 md:gap-8 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
