import { DataTable } from "@/components/table/data-table";
import { columns } from "../../../components/table/table-columns/admin-users-columns";
import { User } from "@/types/types";
import { useGetAllUsersQuery } from "@/store/api/user";
import { useState } from "react";

// const users: User[] = [
//   {
//     // _id: { $oid: "67937f8a72d58bf4ddb193fb" },
//     // externalId: { $numberInt: "36" },
//     // roleId: { $numberInt: "4" },
//     // roleName: "User",
//     // officeId: { $numberInt: "5" },
//     // officeName: "Kolkata Office",
//     // departmentId: { $numberInt: "2" },
//     // departmentName: "Software",
//     // designation: "team member",
//     // email: "abhijit.runtime@gmail.com",
//     // name: "Abhijit Dinda",
//     // dob: { $date: { $numberLong: "1675641600000" } },
//     // gender: { $numberInt: "1" },
//     // mobile: { $numberDouble: "9749517354.0" },
//     // profilePic:
//     //   "https://attendance.runtime-solutions.net/attandance/public/images1/1701403128.jpg",
//     // createdAt: { $date: { $numberLong: "1737719690791" } },
//     // updatedAt: { $date: { $numberLong: "1737719690791" } },
//     // __v: { $numberInt: "0" },

//     _id: "67937f8a72d58bf4ddb193fb",
//     externalId: 36,
//     roleId: 4,
//     roleName: "User",
//     officeId: 5,
//     officeName: "Kolkata Office",
//     departmentId: 2,
//     departmentName: "Software",
//     designation: "team member",
//     email: "abhijit.runtime@gmail.com",
//     name: "Abhijit Dinda",
//     dob: "2023-02-06T00:00:00.000Z",
//     gender: 1,
//     mobile: 9749517354,
//     profilePic:
//       "https://attendance.runtime-solutions.net/attandance/public/images1/1701403128.jpg",
//     createdAt: "2023-02-06T00:21:30.791Z",
//     updatedAt: "2023-02-06T00:21:30.791Z",
//     __v: 0,
//   },
// ];

export default function Users() {
  const [page, setPage] = useState(1); // For pagination
  const [limit, setLimit] = useState(10); // Items per page
  const [userName, setUserName] = useState(""); // For search

  const {
    data: userData,
    isLoading,
    isSuccess,
    error,
    refetch: refetchUsers,
  } = useGetAllUsersQuery({ userName, limit, page });
  return (
    <div className="container  mx-auto min-h-screen w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>
        </div>
      </div>
      {
        // Loading
        isLoading ? (
          <div>Loading...</div>
        ) : // Error
        error ? (
          <div>Error fetching data</div>
        ) : // Success
        userData?.data?.users?.length ? (
          <DataTable columns={columns} data={userData?.data?.users || []} />
        ) : (
          <div>No data found</div>
        )
      }
    </div>
  );
}
