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
import { useDeleteProjectTypeDescMutation } from "@/store/api/projectTypeDesc";

interface AlertDialogDeleteTypeDescProps {
  projectTypeDescId: string;
}

export const AlertDialogDeleteTypeDesc = ({
  projectTypeDescId,
}: AlertDialogDeleteTypeDescProps) => {
  const [
    deleteProjectTypeDesc,
    {
      data: deleteProjectTypeDescData,
      error: deleteProjectTypeDescError,
      isLoading: deleteProjectTypeDescLoading,
    },
  ] = useDeleteProjectTypeDescMutation();

  const handleTypeDescDelete = () => {
    deleteProjectTypeDesc(projectTypeDescId)
      .unwrap()
      .then(() => {
        console.log(deleteProjectTypeDescData?.message);
      })
      .catch((error) => {
        console.log(deleteProjectTypeDescError, error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input">
        Delete Type Description
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleteing a Type Description cannot be undone. This will permanently
            delete the Type Description and all its data!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleTypeDescDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
