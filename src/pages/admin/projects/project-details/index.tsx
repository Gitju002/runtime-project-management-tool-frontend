import {
  Calendar,
  Clock,
  Clock10Icon,
  Clock12Icon,
  DollarSign,
  Globe,
  LayoutDashboard,
  Mail,
  Target,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/table/project-details-data-table";
import { columns } from "@/components/table/table-columns/project-details-columns";
import { StatCard } from "@/components/ui/project-details-stat-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllProjectsQuery } from "@/store/api/project";
import { useSearchParams } from "next/navigation";
import { useGetAllProjectTypedescQuery } from "@/store/api/projectTypeDesc";
import { useGetAllServicesQuery } from "@/store/api/service";
import { useGetAllTaskQuery } from "@/store/api/tasks";
import {
  useGetDurationAnalyticsQuery,
  useGetDurationPerProjectQuery,
  useGetNoOfUsersByProjectQuery,
} from "@/store/api/analytics";
import { OverviewTabSkeleton } from "@/components/skeleton/project-details-overview-skeleton";
import { ServicesTabSkeleton } from "@/components/skeleton/project-details-services-skeleton";
import { TitleDescriptionSkeleton } from "@/components/skeleton/project-details-title-desc-skeleton";

export default function ProjectDetails() {
  const searchParams = useSearchParams();
  const projectName = searchParams.get("projectName") || "";

  const {
    data: tasksData,
    isLoading,
    isError,
  } = useGetAllTaskQuery({
    projectName,
  });

  const {
    data: projectData,
    isLoading: isProjectLoading,
    isFetching,
    error: projectError,
  } = useGetAllProjectsQuery({
    projectName,
  });

  const {
    data: allProjectTypeDesc,
    isLoading: isTypeDescLoading,
    isSuccess,
    error: typeDescError,
  } = useGetAllProjectTypedescQuery({
    projectName,
  });

  const {
    data: servicesData,
    isLoading: isServicesLoading,
    error,
  } = useGetAllServicesQuery({
    projectName,
  });

  const {
    data: tasksDurationData,
    isLoading: isDurationLoading,
    isError: durationError,
  } = useGetDurationAnalyticsQuery({
    projectName,
  });

  const {
    data: noOfUsersData,
    isLoading: isUsersLoading,
    isError: usersError,
  } = useGetNoOfUsersByProjectQuery({
    projectName,
  });

  console.log(noOfUsersData);

  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto py-8 space-y-8">
        {/* Project Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            {isProjectLoading ? (
              <TitleDescriptionSkeleton />
            ) : (
              <>
                <h1 className="text-4xl font-bold tracking-tight">
                  <span className="text-teal-shade dark:text-lime-shade">
                    {projectName || "Project Name"}
                  </span>
                </h1>
                <p className="text-muted-foreground">
                  {projectData?.data?.projects[0].projectDescription ||
                    "Project Description"}
                </p>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Clock className="mr-1 h-3 w-3" /> Active
            </Badge>
            <a
              href={`mailto:${projectData?.data?.projects[0].clientEmail}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-lime-shade bg-teal-shade hover:bg-teal-shade focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email Client
            </a>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Budget"
            value={`$${projectData?.data?.projects[0].cost || "00,000"}`}
            icon={<DollarSign className="h-4 w-4" />}
            description="Estimated budget of project"
            isLoading={isProjectLoading}
          />
          <StatCard
            title="Team Members"
            value={`${noOfUsersData?.data?.totalUsers || "0"}`}
            icon={<Users className="h-4 w-4" />}
            description="Active contributors"
            isLoading={isUsersLoading}
          />
          <StatCard
            title="Project Duration"
            value={`${
              projectData?.data?.projects[0].projectPeriod || "0"
            } Days`}
            icon={<Calendar className="h-4 w-4" />}
            description="Estimated Duration"
            isLoading={isProjectLoading}
          />
          <StatCard
            title="Project Deadline"
            value={`${
              tasksDurationData?.data.project.remainingDays ?? 0 > 0
                ? tasksDurationData?.data.project.remainingDays
                : tasksDurationData?.data.project.exceededDays
            } Days`}
            icon={<Target className="h-4 w-4" />}
            description={
              tasksDurationData?.data.project.remainingDays ?? 0 > 0
                ? "Remaining"
                : "Exceeded"
            }
            className={
              tasksDurationData?.data.project.remainingDays ?? 0 > 0
                ? "text-green-500"
                : "text-red-500"
            }
            isLoading={isDurationLoading}
          />
          <StatCard
            title="Project Start Date"
            value={`${tasksDurationData?.data.project.startDate}`}
            icon={<Clock10Icon className="h-4 w-4" />}
            description=""
            className="text-blue-500"
            isLoading={isDurationLoading}
          />
          <StatCard
            title="Project End Date"
            value={`${tasksDurationData?.data.project.endDate}`}
            icon={<Clock12Icon className="h-4 w-4" />}
            description=""
            className="text-red-500"
            isLoading={isDurationLoading}
          />
        </div>

        {/* Project Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {isProjectLoading || isTypeDescLoading ? (
              <OverviewTabSkeleton />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Project Type Description </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {
                        allProjectTypeDesc?.data?.response[0]
                          .projectTypeDescription
                      }
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Client</p>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {projectData?.data?.projects[0].clientName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {projectData?.data?.projects[0].clientEmail}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Location</p>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Globe className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {allProjectTypeDesc?.data?.response[0].location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <ProgressRing progress={68} size={120} className="my-4" />
                    <div className="text-center">
                      <p className="text-2xl font-bold">68%</p>
                      <p className="text-sm text-muted-foreground">
                        Overall Completion
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            {isServicesLoading ? (
              <ServicesTabSkeleton />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {servicesData?.data?.services?.map((service, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {service.serviceName}
                      </CardTitle>
                      <div className="rounded-full bg-primary/10 p-2">
                        <LayoutDashboard className="h-4 w-4" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        {service.serviceDescription}
                      </p>
                      {/* <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{service.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${service.progress}%` }}
                        />
                      </div>
                    </div> */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task List</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  isLoading={isLoading || isFetching}
                  columns={columns}
                  data={isError ? [] : tasksData?.data || []}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
