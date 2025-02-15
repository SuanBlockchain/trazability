import RecordsTable from "@/components/ui/dashboard/records-table";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <div className="w-full">
      <RecordsTable />
    </div>
  );
}
