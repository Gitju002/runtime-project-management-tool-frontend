import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { DataTable } from "@/components/table/data-table";
import { columns } from "../../../components/table/table-columns/admin-users-columns";
import { useGetAllUsersQuery } from "@/store/api/user";
import { motion } from "framer-motion";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";

export default function Users() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userSearch, setUserSearch] = useState(""); // Debounced search state
  const currentPage = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: userData,
    isLoading,
    isFetching,
    error,
  } = useGetAllUsersQuery({
    userName: searchParams.get("userName") || "",
    page: currentPage,
    limit,
  });

  // Debounced Effect for Search Input (3-second delay)
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (userSearch) {
        params.delete("page"); // Reset page when searching
        params.set("userName", userSearch);
      } else {
        params.delete("userName");
      }
      router.push(`?${params.toString()}`);
    }, 2000); // 2-second debounce

    return () => clearTimeout(delay);
  }, [userSearch]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    if (userData) {
      setTotalPages(userData?.data?.paginationData?.totalPages);
    }
  }, [userData]);

  return (
    <div className="container mx-auto w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <div>
          <Input
            placeholder="Search Users..."
            onChange={(e) => setUserSearch(e.target.value)}
            value={userSearch}
          />
        </div>
      </div>

      {isLoading || isFetching ? (
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
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-96">
          <img
            src="/images/missing.png"
            alt="No users found"
            className="w-36 h-36 mb-4"
          />
          <p className="text-lg font-semibold text-gray-600">No users found.</p>
          <p className="text-sm text-gray-500">
            Please check the search criteria and try again.
          </p>
        </div>
      ) : userData?.data?.users?.length ? (
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
      )}
    </div>
  );
}
