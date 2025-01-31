import { DataTable } from "@/components/table/data-table";
import { columns } from "../../../components/table/table-columns/admin-users-columns";
import { User } from "@/types/types";

const users: User[] = [
  {
    // _id: { $oid: "67937f8a72d58bf4ddb193fb" },
    // externalId: { $numberInt: "36" },
    // roleId: { $numberInt: "4" },
    // roleName: "User",
    // officeId: { $numberInt: "5" },
    // officeName: "Kolkata Office",
    // departmentId: { $numberInt: "2" },
    // departmentName: "Software",
    // designation: "team member",
    // email: "abhijit.runtime@gmail.com",
    // name: "Abhijit Dinda",
    // dob: { $date: { $numberLong: "1675641600000" } },
    // gender: { $numberInt: "1" },
    // mobile: { $numberDouble: "9749517354.0" },
    // profilePic:
    //   "https://attendance.runtime-solutions.net/attandance/public/images1/1701403128.jpg",
    // createdAt: { $date: { $numberLong: "1737719690791" } },
    // updatedAt: { $date: { $numberLong: "1737719690791" } },
    // __v: { $numberInt: "0" },

    _id: "67937f8a72d58bf4ddb193fb",
    externalId: 36,
    roleId: 4,
    roleName: "User",
    officeId: 5,
    officeName: "Kolkata Office",
    departmentId: 2,
    departmentName: "Software",
    designation: "team member",
    email: "abhijit.runtime@gmail.com",
    name: "Abhijit Dinda",
    dob: "2023-02-06T00:00:00.000Z",
    gender: 1,
    mobile: 9749517354,
    profilePic:
      "https://attendance.runtime-solutions.net/attandance/public/images1/1701403128.jpg",
    createdAt: "2023-02-06T00:21:30.791Z",
    updatedAt: "2023-02-06T00:21:30.791Z",
    __v: 0,
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
