"use client";
import RecordsTable from "@/components/ui/dashboard/records-table";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const { data: session, status: statusSession } = useSession();
  console.log(session);
  /* if (!session) {
    redirect("/auth/login");
  } */

  return (
    <div className="w-full">
      <RecordsTable />
    </div>
  );
}
