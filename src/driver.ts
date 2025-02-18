import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Dispatch } from "react";

export const userTaskTour = (
  setDisableBtn: Dispatch<React.SetStateAction<boolean>>
) => {
  setDisableBtn(true);
  const formFields = [
    "Project Name",
    "Service Name",
    "Purpose",
    "Start Date",
    "End Date",
    "Task Start Date",
    "Task End Date",
    "Status",
  ];

  const tourInstance = driver({
    steps: [
      {
        element: "#step_1_addTask",
        popover: {
          title: "Add Task Button",
          description: `Your first step is to add a task which will be displayed in the table. Click on the button to open the form. The form contains fields like:<br>- <b>${formFields.join(
            "<br>- "
          )}`,
        },
      },
      {
        element: "#step_2_analytics",
        popover: {
          title: "Analytics Section",
          description:
            "This section displays the analytics of the tasks. Here you will get to see the overviews of: <br>- <b>Task completion status<br>- Tasks across different projects<br>- Project duration across different projects</b>",
        },
      },
      {
        element: "#step_3_userLogs",
        popover: {
          title: "User Task Logs Section",
          description:
            "Here you can see the logs of the tasks, each task will be added to the table after you click on the <b>Add Task</b> button and fill the form.",
        },
      },
      {
        element: "#step_4_taskTable",
        popover: {
          title: "Task Logs Table",
          description: "The table displays the tasks that you have added.",
          onNextClick: () => {
            setDisableBtn(false);
            tourInstance.moveNext();
          },
        },
      },
      // Add more steps as needed
    ],
    allowClose: false,
    showProgress: true,
  });

  // Start the tour directly
  tourInstance.drive();
};

export const startAdminTour = (router: any) => {
  const driverObj = driver({
    steps: [
      {
        element: "#admin_home_statcard",
        popover: {
          title: "📊 Stat Cards",
          description:
            "These cards display the total number of users and projects.",
        },
      },
      {
        element: "#admin_home_placeholder",
        popover: {
          title: "🚀 Placeholder for more features",
          description:
            "This section is a placeholder for more features that will be added in the future.",
        },
      },
      {
        element: "#sidebar_projects",
        popover: {
          title: "📂 Projects Section",
          description: "Click 'Next' to go to the Projects page.",
          showButtons: ["next"],
          onNextClick: () => {
            localStorage.setItem("driverStep", "3"); // Store progress
            driverObj.destroy();
            router.push("/admin/projects"); // Redirect to Projects page
          },
        },
      },
    ],
    allowClose: false,
    showProgress: true,
  });

  driverObj.drive();
};

// ✅ Tour for Projects Page (Forcing Click on "Add Project")
export const startProjectsTour = () => {
  const driverObj = driver({
    steps: [
      {
        element: "#project_page",
        popover: {
          title: "📂 Projects Page",
          description:
            "This page displays all projects and allows admins to manage them.",
        },
      },
      {
        element: "#add_project",
        popover: {
          title: "➕ Add a Project",
          description: "Click this button to add a new project.",
          showButtons: [], // Removes "Next" button to force user interaction
        },
      },
    ],
    allowClose: false,
    showProgress: true,
  });

  driverObj.drive();

  // ✅ Detect click on "Add Project" and destroy tour
  const addProjectBtn = document.querySelector("#add_project");
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      localStorage.setItem("driverStep", "project_added");
      driverObj.destroy(); // Destroy tour on button click
    });
  }
};

// ✅ Continue Tour After Form Submission
export const resumeProjectsTour = () => {
  const storedStep = localStorage.getItem("driverStep");

  if (storedStep === "project_added") {
    setTimeout(() => {
      const driverObj = driver({
        steps: [
          {
            element: "#project_table",
            popover: {
              title: "📋 Projects List",
              description:
                "Here is the newly added project in the top of the table.",
            },
          },
          {
            element: "#sidebar_services",
            popover: {
              title: "⚙️ Services Section",
              description: "Click 'Next' to go to the Services page.",
              showButtons: ["next"],
              onNextClick: () => {
                localStorage.setItem("driverStep", "7"); // Store progress
                driverObj.destroy();
                window.location.href = "/admin/services"; // Redirect to Services page
              },
            },
          },
        ],
        allowClose: false,
        showProgress: true,
      });

      driverObj.drive(0);
      localStorage.removeItem("driverStep");
    }, 1000);
  }
};

// ✅ Tour for Services Page (Forcing Click on "Add Service")
export const startServicesTour = () => {
  const driverObj = driver({
    steps: [
      {
        element: "#services_page",
        popover: {
          title: "🔧 Services Page",
          description:
            "This page displays all services and allows admins to manage them.",
        },
      },
      {
        element: "#add_service",
        popover: {
          title: "➕ Add a Service",
          description: "Click this button to add a new service.",
          showButtons: [], // Forces user to click the button
        },
      },
    ],
    allowClose: false,
    showProgress: true,
  });

  driverObj.drive();

  // ✅ Detect click on "Add Service" and destroy tour
  const addServiceBtn = document.querySelector("#add_service");
  if (addServiceBtn) {
    addServiceBtn.addEventListener("click", () => {
      localStorage.setItem("driverStep", "service_added");
      driverObj.destroy(); // Destroy tour on button click
    });
  }
};

export const resumeServicesTour = () => {
  const storedStep = localStorage.getItem("driverStep");

  if (storedStep === "service_added") {
    setTimeout(() => {
      const driverObj = driver({
        steps: [
          {
            element: "#services_table",
            popover: {
              title: "📋 Services List",
              description:
                "Here is the newly added service in the top of the table.",
            },
          },
          {
            element: "#sidebar_typeDesc",
            popover: {
              title: "📜 Type Description Section",
              description: "Click 'Next' to go to the Type Description page.",
              showButtons: ["next"],
              onNextClick: () => {
                localStorage.setItem("driverStep", "typeDesc_redirect");
                driverObj.destroy();
                window.location.href = "/admin/type-description"; // Redirect to Type Description page
              },
            },
          },
        ],
        allowClose: false,
        showProgress: true,
      });

      driverObj.drive(0);
      localStorage.removeItem("driverStep");
    }, 1000);
  }
};
export const startTypeDescTour = () => {
  console.log("Executing startTypeDescTour..."); // ✅ Debugging log

  const driverObj = driver({
    steps: [
      {
        element: "#type_description_page",
        popover: {
          title: "📜 Type Description Page",
          description: "This page manages different project type descriptions.",
        },
      },
      {
        element: "#add_TypeDesc",
        popover: {
          title: "➕ Add Type Description",
          description: "Click this button to add a new type description.",
          showButtons: [], // Forces user to click the button
        },
      },
    ],
    allowClose: false,
    showProgress: true,
  });

  driverObj.drive();

  // ✅ Detect click on "Add Type Description" and destroy tour
  const addTypeDescBtn = document.querySelector("#add_TypeDesc");
  if (addTypeDescBtn) {
    addTypeDescBtn.addEventListener("click", () => {
      localStorage.setItem("driverStep", "typeDesc_added");
      driverObj.destroy();
    });
  }
};

// ✅ Continue Tour After Type Description Form Submission
export const resumeTypeDescTour = () => {
  const storedStep = localStorage.getItem("driverStep");

  if (storedStep === "typeDesc_added") {
    setTimeout(() => {
      const driverObj = driver({
        steps: [
          {
            element: "#typeDescTable",
            popover: {
              title: "📋 Type Description List",
              description:
                "Here is the newly added type description in top of the table.",
            },
          },
          {
            popover: {
              title: "🎉 Congratulations! 😊",
              description:
                "You have successfully completed the basic tour of the admin panel. Now you can explore more features on your own.",
            },
          },
        ],
        allowClose: false,
        showProgress: true,
      });

      driverObj.drive(0);
      localStorage.removeItem("driverStep");
    }, 1000);
  }
};
// ✅ Automatically Detects and Runs the Correct Tour
export const startTour = (router: any) => {
  if (typeof window !== "undefined") {
    const storedStep = localStorage.getItem("driverStep");

    if (window.location.pathname === "/admin") {
      startAdminTour(router);
    } else if (
      window.location.pathname === "/admin/projects" &&
      storedStep === "3"
    ) {
      localStorage.removeItem("driverStep");
      startProjectsTour();
    } else if (
      window.location.pathname === "/admin/services" &&
      storedStep === "7"
    ) {
      localStorage.removeItem("driverStep");
      startServicesTour();
    } else if (
      window.location.pathname === "/admin/type-description" &&
      storedStep === "typeDesc_redirect"
    ) {
      localStorage.removeItem("driverStep");

      // ✅ Small delay to ensure elements are loaded
      setTimeout(() => {
        startTypeDescTour();
        console.log("Type Description tour started"); // ✅ Debugging log
      }, 1000);
    }
  }
};
