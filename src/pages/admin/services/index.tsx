import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/table-columns/services-columns";
import { PlusCircle } from "lucide-react";
import ServiceForm from "@/pages/admin/services/_components/services-form";
import { useGetAllServicesQuery } from "@/store/api/service";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export type Service = {
  id: string;
  projectName: string;
  serviceName: string;
  description: string;
};

export default function Services() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Items per page
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const searchParams = useSearchParams();
  const projectName = searchParams.get("projectName") || ""; // Reading from URL
  const serviceName = searchParams.get("serviceName") || ""; // Reading from URL
  const router = useRouter();
  const [projectSearch, setProjectSearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");

  const handlePageChange = (page: number) => {
    setPaginationLoading(true);
    setCurrentPage(page);
  };

  const {
    data: servicesData,
    isFetching,
    isLoading,
    isError,
  } = useGetAllServicesQuery({
    projectName,
    serviceName,
    page: currentPage,
    limit,
  });

  useEffect(() => {
    if (servicesData) {
      setTotalPages(servicesData?.data?.paginationData?.totalPages);
      setPaginationLoading(false);
    }
  }, [servicesData]);

  useEffect(() => {
    // Set initial values from URL
    setProjectSearch(searchParams.get("projectName") || "");
    setServiceSearch(searchParams.get("serviceName") || "");
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (projectSearch) {
        params.delete("page"); // Reset page when searching
        params.set("projectName", projectSearch);
      } else {
        params.delete("projectName");
      }
      router.push(`?${params.toString()}`);
    }, 2000); // 3-second delay

    return () => clearTimeout(delay);
  }, [projectSearch]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (serviceSearch) {
        params.delete("page"); // Reset page when searching
        params.set("serviceName", serviceSearch);
      } else {
        params.delete("serviceName");
      }
      router.push(`?${params.toString()}`);
    }, 1250); // 3-second delay

    return () => clearTimeout(delay);
  }, [serviceSearch]);

  const formattedServices: Service[] =
    servicesData?.data?.services?.map((service, index) => ({
      id: (limit * (currentPage - 1) + index + 1).toString(),
      projectName:
        typeof service.project === "string"
          ? service.project
          : service.project.projectName, // Ensure projectName is a string
      serviceName: service.serviceName,
      description: service.serviceDescription,
    })) || []; // Default to empty array if undefined

  return (
    <div className="container  mx-auto w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button className=" transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                  Add Service <PlusCircle className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="form-bg dark:hover:shadow-2xl dark:hover:shadow-teal-shade/60 transition-all duration-200">
              <DialogTitle>Add New Service</DialogTitle>
              <ServiceForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between gap-5 items-center">
          <Input
            placeholder="Filter by Project Names..."
            onChange={(e) => setProjectSearch(e.target.value)}
            value={projectSearch}
          />
          <Input
            placeholder="Filter by Service Names..."
            onChange={(e) => setServiceSearch(e.target.value)}
            value={serviceSearch}
          />
        </div>
        <>
          <DataTable
            columns={columns}
            isLoading={isLoading || isFetching || paginationLoading}
            data={isError ? [] : formattedServices || []}
          />
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      </div>
    </div>
  );
}
