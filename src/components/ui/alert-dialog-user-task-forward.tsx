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

interface AlertDialogUserTaskForwardProps {
  taskId: string;
}

export const AlertDialogUserTaskForward = ({
  taskId,
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
      <AlertDialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input">
        Forward Task
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
