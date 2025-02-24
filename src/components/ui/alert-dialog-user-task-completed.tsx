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
import { useMarkAsCompletedMutation } from "@/store/api/tasks";

interface AlertDialogUserTaskCompletedProps {
  taskId: string;
}

export const AlertDialogUserTaskCompleted = ({
  taskId,
}: AlertDialogUserTaskCompletedProps) => {
  const [
    markAsCompleted,
    {
      data: markAsCompletedData,
      error: markAsCompletedError,
      isLoading: markAsCompletedLoading,
    },
  ] = useMarkAsCompletedMutation();

  const handleMarkAsCompleted = () => {
    markAsCompleted({ taskId: taskId })
      .unwrap()
      .then(() => {
        console.log(markAsCompletedData?.message);
      })
      .catch((error) => {
        console.log(markAsCompletedError, error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input">
        Complete Task
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Completing a task means that it has been successfully completed and
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleMarkAsCompleted}
            className="transition-all duration-200 border border-teal-shade dark:border-lime-shade bg-transparent text-teal-shade dark:text-lime-shade  hover:shadow-lg hover:bg-transparent dark:hover:shadow-lime-shade/35 hover:shadow-teal-shade/35"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
