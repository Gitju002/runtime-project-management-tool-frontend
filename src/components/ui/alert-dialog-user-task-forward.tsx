import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useContinueTaskTomorrowMutation } from "@/store/api/tasks";
import { ArrowUp } from "lucide-react";

interface AlertDialogUserTaskForwardProps {
  taskId: string;
  buttonType: "icon" | "text";
}

export const AlertDialogUserTaskForward = ({
  taskId,
  buttonType,
}: AlertDialogUserTaskForwardProps) => {
  const [
    continueTaskTomorrow,
    {
      data: continueTaskTomorrowData,
      error: continueTaskTomorrowError,
      isLoading: continueTaskTomorrowLoading,
    },
  ] = useContinueTaskTomorrowMutation();

  const handleContinueTaskTomorrow = () => {
    continueTaskTomorrow({ taskId: taskId })
      .unwrap()
      .then(() => {
        console.log(continueTaskTomorrowData?.message);
      })
      .catch((error) => {
        console.log(continueTaskTomorrowError, error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        title={buttonType === "icon" ? "Forward to Next Day" : undefined}
        className={` w-full relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input ${
          buttonType === "icon" &&
          "border border-blue-600 text-blue-600 dark:text-blue-500  font-semibold"
        } `}
      >
        {buttonType === "text" ? (
          <span>Forward to Next Day</span>
        ) : (
          <ArrowUp className="h-4 w-4" />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Carrying forward a task to the next working day will mark it as
            "Ongoing" and it will be continued on the next day.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleContinueTaskTomorrow}
            className="transition-all duration-200 border border-teal-shade dark:border-lime-shade bg-transparent text-teal-shade dark:text-lime-shade  hover:shadow-lg hover:bg-transparent dark:hover:shadow-lime-shade/35 hover:shadow-teal-shade/35"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
