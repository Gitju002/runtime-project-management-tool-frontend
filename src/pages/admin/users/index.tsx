import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { useGetAllUsersQuery } from "@/store/api/user";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Image from "next/image";
import {
  AreaChartIcon,
  BriefcaseIcon,
  BuildingIcon,
  PhoneIcon,
} from "lucide-react";
import { UserCardSkeleton } from "@/components/skeleton/admin-users-card-skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    }, 500);

    return () => clearTimeout(delay);
  }, [userSearch]);

  useEffect(() => {
    if (userData) {
      setTotalPages(userData?.data?.paginationData?.totalPages);
    }
  }, [userData]);
  // console.log(userData?.data?.users);
  return (
    <div className="container w-full mx-auto py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          User Management
        </h1>
        <div className="mt-4 md:w-1/2 sm:mt-0">
          <Input
            placeholder="Search Users..."
            onChange={(e) => setUserSearch(e.target.value)}
            value={userSearch}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading || isFetching
          ? Array.from({ length: limit }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))
          : userData?.data.users.map((user) => (
              <Card
                key={user.id}
                className="flex flex-col justify-between overflow-hidden transition-all hover:shadow-xl dark:hover:shadow-blue-800/20 hover:scale-105 "
              >
                <div>
                  {" "}
                  <CardHeader className="border-b bg-gradient-to-br from-slate-50 via-gray-200/40 to-gray-300 dark:from-blue-700/40 dark:via-slate-900/80 dark:to-blue-950 py-6">
                    <div className="flex items-center gap-4">
                      <Image
                        height={64}
                        width={64}
                        src={user.profilepic || "/images/default-user.png"}
                        alt={user.name}
                        className="aspect-square rounded-full border-4 border-white object-cover shadow-md"
                      />
                      <div>
                        <CardTitle className="text-xl ">{user.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1  shadow-md">
                          {user.role_name || "N/A"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-6 p-6">
                    <div className="flex items-center gap-4">
                      <BuildingIcon className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Department
                        </p>
                        <p className="font-semibold">{user.department_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <PhoneIcon className="h-10 w-10 rounded-full bg-green-100 p-2 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Mobile
                        </p>
                        <p className="font-semibold">{user.mobile || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <BriefcaseIcon className="h-10 w-10 rounded-full bg-yellow-100 p-2 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Office
                        </p>
                        <p className="font-semibold">{user.office_name}</p>
                      </div>
                    </div>
                  </CardContent>
                </div>
                <div className="p-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleClick(user.name)}
                  >
                    <AreaChartIcon className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </Card>
            ))}
      </div>

      <div className="mt-8">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
