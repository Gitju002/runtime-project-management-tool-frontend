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
