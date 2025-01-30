import { DataTable } from "@/components/table/data-table";
import { columns } from "./_components/columns";
import { User } from "@/types/types";

const users: User[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    __v: 0,
    _id: "1",
    createdAt: "2021-09-29T07:00:00.000Z",
    updatedAt: "2021-09-29T07:00:00.000Z",
    departmentId: 1,
    departmentName: "IT",
    designation: "Software Engineer",
    dob: "1990-01-01",
    externalId: 1,
    gender: 1,
    mobile: 1234567890,
    officeId: 1,
    officeName: "Head Office",
    profilePic: "https://randomuser.me/api/portraits",
    roleId: 2,
    roleName: "Admin",
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
