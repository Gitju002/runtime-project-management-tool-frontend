import { DataTable } from "@/components/table/data-table";
import { columns } from "../../../components/table/table-columns/admin-users-columns";
import { useGetAllUsersQuery } from "@/store/api/user";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CustomPagination } from "@/components/ui/custom-pagination";

export default function Users() {
  const [userName, setUserName] = useState(""); // For search
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [limit, setLimit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page: ", page);
  };

  const {
    data: userData,
    isLoading,
    isSuccess,
    error,
    refetch: refetchUsers,
  } = useGetAllUsersQuery({ userName, page: currentPage, limit });

  useEffect(() => {
    if (userData) {
      setTotalPages(userData?.data?.paginationData?.totalPages);
      console.log(userData?.data);
    }
  }, [userData]);

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
          <>
            <DataTable columns={columns} data={userData?.data?.users || []} />
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div>No data found</div>
        )
      }
    </div>
  );
}
