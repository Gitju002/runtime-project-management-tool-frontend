import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { Dispatch } from "react";
export const userTaskTour = (
  setDisableBtn: Dispatch<React.SetStateAction<boolean>>
) => {
  setDisableBtn(true);
  const tourInstance = driver({
    steps: [
      {
        element: "#step_1_addTask",
        popover: {
          title: "Step 1",
          description: "This is the first step of the tour.",
        },
      },
      {
        element: "#step_2_analytics",
        popover: {
          title: "Step 2",
          description: "This is the second step of the tour.",
        },
      },
      {
        element: "#step_3_userLogs",
        popover: {
          title: "Step 3",
          description: "This is the third step of the tour.",
        },
      },
      {
        element: "#step_4_taskTable",
        popover: {
          title: "Step 4",
          description: "This is the fourth step of the tour.",
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
