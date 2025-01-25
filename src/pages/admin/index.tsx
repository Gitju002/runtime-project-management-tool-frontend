"use client";

import { JSX, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectsTab from "@/pages/admin/_components/projects-tab";
import ServicesTab from "@/pages/admin/_components/services-tab";
import ProjectTypesTab from "@/pages/admin/_components/project-types-tab";
import UsersTab from "@/pages/admin/_components/users-tab";
import AnalyticsTab from "@/pages/admin/_components/analytics-tab";
import { useParams, useRouter, useSearchParams } from "next/navigation";

enum AdminTabs {
  Projects = "projects",
  Services = "services",
  ProjectTypes = "projectTypes",
  Users = "users",
  Analytics = "analytics",
}

export default function Admin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<AdminTabs>(AdminTabs.Projects);
  const [tabs, setTabs] = useState<
    {
      name: AdminTabs;
      label: string;
      content?: JSX.Element;
    }[]
  >([
    {
      name: AdminTabs.Projects,
      label: "Projects",
      content: <ProjectsTab />,
    },
    {
      name: AdminTabs.Services,
      label: "Services",
      content: <ServicesTab />,
    },
    {
      name: AdminTabs.ProjectTypes,
      label: "Project Types",
      content: <ProjectTypesTab />,
    },
    {
      name: AdminTabs.Users,
      label: "Users",
      content: <UsersTab />,
    },
    {
      name: AdminTabs.Analytics,
      label: "Analytics",
      content: <AnalyticsTab />,
    },
  ]);

  useEffect(() => {
    const pushToUrl = async () => {
      const urlSearchParams = new URLSearchParams(searchParams);
      urlSearchParams.set("tab", selectedTab);
      router.push(`?${urlSearchParams.toString()}`, {
        scroll: false,
      });
    };
    pushToUrl();
    return () => {};
  }, [selectedTab]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs
        defaultValue="projects"
        className="w-full"
        onValueChange={(e) => {
          setSelectedTab(e as AdminTabs);
        }}
      >
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab, index) => (
            <TabsTrigger key={index} value={tab.name}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent key={index} value={tab.name}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
