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
import { useDeleteServiceMutation } from "@/store/api/service";

interface AlertDialogDeleteServiceProps {
  serviceId: string;
}

export const AlertDialogDeleteService = ({
  serviceId,
}: AlertDialogDeleteServiceProps) => {
  const [
    deleteService,
    {
      data: deleteServiceData,
      error: deleteServiceError,
      isLoading: deleteServiceLoading,
    },
  ] = useDeleteServiceMutation();

  const handleServiceDelete = () => {
    deleteService(serviceId)
      .unwrap()
      .then(() => {
        console.log(deleteServiceData?.message);
      })
      .catch((error) => {
        console.log(deleteServiceError, error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input">
        Delete Service
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleteing a service cannot be undone. This will permanently delete
            the service!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleServiceDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
