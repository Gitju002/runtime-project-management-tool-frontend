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
import { useDeleteProjectMutation } from "@/store/api/project";

interface AlertDialogDeleteProjectProps {
  projectId: string;
}

export const AlertDialogDeleteProject = ({
  projectId,
}: AlertDialogDeleteProjectProps) => {
  const [
    deleteProject,
    {
      data: deleteProjectData,
      error: deleteProjectError,
      isLoading: deleteProjectLoading,
    },
  ] = useDeleteProjectMutation();

  const handleProjectDelete = () => {
    deleteProject(projectId)
      .unwrap()
      .then(() => {
        console.log(deleteProjectData?.message);
      })
      .catch((error) => {
        console.log(deleteProjectError, error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input">
        Delete Project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleteing a project cannot be undone. This will permanently delete
            the project and all its data!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleProjectDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
