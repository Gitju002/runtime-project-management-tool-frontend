import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { DataTable } from "@/components/table/data-table";
import { columns } from "../../../components/table/table-columns/admin-users-columns";
import { useGetAllUsersQuery } from "@/store/api/user";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChartArea } from "lucide-react";

export default function Users() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userSearch, setUserSearch] = useState(""); // Debounced search state
  const currentPage = Number(searchParams.get("page")) || 1;
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: userData,
    isLoading,
    isFetching,
    isError,
  } = useGetAllUsersQuery({
    userName: searchParams.get("userName") || "",
    page: currentPage,
    limit,
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleClick = (userName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("userName", userName);
    router.push(`/admin/analytics?${params.toString()}`);
  };

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
    }, 1250); // 2-second debounce

    return () => clearTimeout(delay);
  }, [userSearch]);

  useEffect(() => {
    if (userData) {
      setTotalPages(userData?.data?.paginationData?.totalPages);
    }
  }, [userData]);
  // console.log(userData?.data?.users);
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
      <>
        {/* <DataTable
          columns={columns}
          isLoading={isLoading || isFetching}
          data={isError ? [] : userData?.data?.users || []}
        /> */}
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userData?.data?.users.map((user) => (
            <Card key={user.id} className="border-2 border-lime-shade/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      height={40}
                      width={40}
                      src={user.profilepic}
                      alt={user.name}
                      className="rounded-full h-16 w-16 obcject-cover ring-2 ring-teal-shade"
                    />
                    <h3 className="text-lg font-bold">{user.name}</h3>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="cursor-pointer hover:underline "
                        onClick={() => handleClick(user.name)}
                      >
                        <ChartArea className="size-8 stroke-1 stroke-teal-shade" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to view analytics</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="space-y-4">
                  <section className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-bold">Departnent:</p>
                      <p>{user.department_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Mobile:</p>
                      <p>{user.mobile || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Office:</p>
                      <p>{user.office_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Role:</p>
                      <p>{user.role_name || "N/A"}</p>
                    </div>
                  </section>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    </div>
  );
}
