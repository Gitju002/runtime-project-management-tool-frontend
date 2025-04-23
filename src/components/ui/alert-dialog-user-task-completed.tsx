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
import { CheckCircle } from "lucide-react";

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
      <AlertDialogTrigger className="w-full relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input font-semibold border border-green-600 text-green-600 dark:text-green-500">
        Completed <CheckCircle className=" h-4 w-4 " />
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
