import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GroupedTasks } from "@/types/types";
import { formatDate, formatTime } from "@/utils/tasksFormatting";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialogUserTaskForward } from "@/components/ui/alert-dialog-user-task-forward";
import { AlertDialogUserTaskCompleted } from "@/components/ui/alert-dialog-user-task-completed";

interface TaskGroupProps {
  group: GroupedTasks[string]; // Now matches the grouped task structure
}

export function TaskGroup({ group }: TaskGroupProps) {
  const latestTask = group?.tasks[0];
  // console.log("Latest Task: ", latestTask);
  const isCompleted = latestTask?.status === "Completed";

  return (
    <Card className="shadow-md dark:shadow-black/20 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 bg-gradient-to-br from-white to-slate-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-teal-shade dark:text-lime-shade">
            {group?.purpose}
          </CardTitle>
          <Badge variant={isCompleted ? "success" : "ongoing"} className="mt-2">
            {isCompleted ? "Completed" : "Ongoing"}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">{group?.service}</div>
        <div className="text-sm font-medium mt-1"> {group?.projectName}</div>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <ScrollArea className="h-24  mt-1">
          {group?.tasks?.map((task, index) => (
            <div key={task._id}>
              <div className="flex items-center gap-2 justify-between">
                <div className="w-full flex flex-row justify-between items-center gap-2">
                  <div className=" flex items-center gap-2">
                    <div className="text-sm font-medium">
                      {formatDate(task.startDate)}
                    </div>
                    <Badge
                      variant={
                        task.status === "Completed" ? "success" : "ongoing"
                      }
                      className="mt-1"
                    >
                      {task.status}
                    </Badge>
                  </div>
                  {index === group?.tasks?.length - 1 && (
                    <div className="text-sm font-medium">
                      <span className="text-xs opacity-60">Started at: </span>
                      {formatTime(task.startTime)}
                    </div>
                  )}
                  {task.status === "Completed" && (
                    <div className="text-sm font-medium">
                      <span className="text-xs opacity-60">Finised at: </span>
                      {formatTime(task.finishTime)}
                    </div>
                  )}
                </div>
                {formatDate(task.startDate) ===
                  formatDate(new Date().toISOString()) &&
                  task.status === "Ongoing" &&
                  !task.finishTime && (
                    <div className="flex space-x-2">
                      <AlertDialogUserTaskForward
                        buttonType="icon"
                        taskId={task._id}
                      />
                      <AlertDialogUserTaskCompleted
                        buttonType="icon"
                        taskId={task._id}
                      />
                    </div>
                  )}
              </div>
              {index < group?.tasks?.length - 1 && (
                <div className="border-l-2 border-dashed border-gray-300 h-4 ml-2 my-1"></div>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
export default TaskGroup;
