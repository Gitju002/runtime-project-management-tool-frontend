import { DataTable } from "@/components/table/data-table";
import { columns } from "./_components/columns";
import { User } from "@/types/types";

const users: User[] = [
  {
    username: "John Doe",
    email: "john.doe@example.com",
  },
];

export default function Users() {
  return (
    <div className="container  mx-auto min-h-screen w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>
        </div>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
