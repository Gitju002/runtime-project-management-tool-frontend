import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TaskForm from "@/pages/user/_components/task-form";

export const EditSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-input">
        Edit Task
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <p className="text-sm text-gray-500">
            Edit the task details below and click on the save button to save the
            changes.
          </p>
        </SheetDescription>
        <div className="my-10">
          <TaskForm setIsOpen={() => {}} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
