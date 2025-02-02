import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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

export type Service = {
  id: string;
  projectName: string;
  serviceName: string;
  description: string;
};

// const services: Service[] = [
//   {
//     id: "1",
//     projectName: "E-commerce Platform",
//     serviceName: "Frontend Development",
//     description: "Develop responsive user interface using React",
//   },
//   {
//     id: "2",
//     projectName: "CRM System",
//     serviceName: "Backend Development",
//     description: "Build RESTful API using Node.js and Express",
//   },
//   {
//     id: "3",
//     projectName: "Mobile App",
//     serviceName: "UI/UX Design",
//     description: "Create intuitive and appealing user interface designs",
//   },
//   // Add more mock services as needed
// ];

export default function Services() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState(""); // For search
  const [page, setPage] = useState(1); // For pagination
  const [limit, setLimit] = useState(10); // Items per page

  const {
    data: servicesData,
    isLoading,
    error,
    refetch,
  } = useGetAllServicesQuery({
    projectName,
    limit,
    page,
  });

  useEffect(() => {
    refetch();
  }, [projectName, page, limit]);

  const formattedServices: Service[] =
    servicesData?.data?.services?.map((service, index) => ({
      id: (index + 1).toString(), // Ensure id is a string
      projectName:
        typeof service.project === "string"
          ? service.project
          : service.project.projectName, // Ensure projectName is a string
      serviceName: service.serviceName,
      description: service.serviceDescription,
    })) || []; // Default to empty array if undefined

  console.log(servicesData);

  return (
    <div className="container  mx-auto min-h-screen w-full py-6">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className=" transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35">
                Add Service <PlusCircle className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add New Service</DialogTitle>
              <ServiceForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        {
          // Loading
          isLoading ? (
            <div>Loading...</div>
          ) : // Error
          error ? (
            <div>Error fetching data</div>
          ) : // Success
          servicesData?.data?.services?.length ? (
            <DataTable columns={columns} data={formattedServices || []} />
          ) : (
            <div>No data found</div>
          )
        }
      </div>
    </div>
  );
}
