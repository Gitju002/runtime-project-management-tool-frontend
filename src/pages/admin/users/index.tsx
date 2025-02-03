import { DataTable } from "@/components/table/data-table";
import { columns } from "../../../components/table/table-columns/admin-users-columns";
import { useGetAllUsersQuery } from "@/store/api/user";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="container  mx-auto w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>
        </div>
      </div>
      {
        // Loading
        isLoading ? (
          <div className="flex justify-center items-center h-96">
            <motion.div
              animate={{ opacity: [1, 0.5, 1], rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <img
                src="/images/hourglass.png"
                alt="loading..."
                className="w-14 h-14 md:w-20 md:h-20"
              />
            </motion.div>
          </div>
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
