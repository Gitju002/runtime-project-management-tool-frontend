import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { useGetProjectListQuery } from "@/store/api/project";
import { useGetServiceByProjectQuery } from "@/store/api/service"; // Import the service query
import { addTaskSchema } from "@/schema";
import { useCreateTaskMutation } from "@/store/api/tasks";
import { TimePicker } from "@/components/ui/time-picker";
import { Loader2 } from "lucide-react";

const TaskForm = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      date: new Date().toISOString(),
      project: "",
      service: "",
      purpose: "",
      startDate: new Date().toISOString(),
      startTime: "",
      finishDate: new Date().toISOString(),
      finishTime: "",
      status: "Initiated",
    },
  });

  const { data: projectLists, isLoading: isProjectLoading } =
    useGetProjectListQuery();

  const selectedProject = useWatch({ control: form.control, name: "project" });

  // Fetch services when a project is selected
  const { data: serviceLists, isLoading: isServiceLoading } =
    useGetServiceByProjectQuery(selectedProject, { skip: !selectedProject });

  const [createTask, { isLoading: isSubmitting }] = useCreateTaskMutation();

  function onSubmit(values: z.infer<typeof addTaskSchema>) {
    createTask(values)
      .unwrap()
      .then(() => {
        form.reset();
        setIsOpen(false);
      });
  }
  const isFormDisabled = isProjectLoading || isServiceLoading || isSubmitting;

  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar p-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div
            className={cn(
              "grid gap-2",
              selectedProject ? "grid-cols-2" : "grid-cols-1"
            )}
          >
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      <Combobox
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isFormDisabled}
                        data={projectLists?.data?.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedProject && (
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <Combobox
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isFormDisabled || !serviceLists}
                          data={
                            serviceLists?.data?.map((service) => ({
                              label: service.serviceName,
                              value: service.serviceName,
                            })) || []
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background hover:bg-input"
                    placeholder="Define Project Purpose Here"
                    {...field}
                    disabled={isFormDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      placeholder="Pick start date"
                      value={field.value ? new Date(field.value) : new Date()}
                      onChange={(e) => field.onChange(e?.toISOString())}
                      btnDisabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      disabled={isFormDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="finishDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Finish Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      placeholder="Pick finish date"
                      value={field.value ? new Date(field.value) : new Date()}
                      onChange={(e) => field.onChange(e?.toISOString())}
                      btnDisabled={isFormDisabled}
                      disabled={(date: Date) => {
                        const startDate = form.watch("startDate");
                        return startDate ? date < new Date(startDate) : false;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finishTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Finish Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                      disabled={isFormDisabled}
                      // disabled={isProjectLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Completion Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isFormDisabled}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`
                      ${
                        field.value === "Initiated"
                          ? "!text-blue-600 font-semibold bg-background"
                          : ""
                      }
                      ${
                        field.value === "Ongoing"
                          ? "!text-yellow-600 font-semibold bg-background"
                          : ""
                      }
                      ${
                        field.value === "Completed"
                          ? "!text-green-600 font-semibold bg-background"
                          : ""
                      }
                      `}
                    >
                      <SelectValue placeholder="Select your Task Completion Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="Initiated"
                      className="!text-blue-600 font-semibold"
                    >
                      Initiated
                    </SelectItem>
                    <SelectItem
                      value="Ongoing"
                      className="!text-yellow-600 font-semibold"
                    >
                      Ongoing
                    </SelectItem>
                    <SelectItem
                      value="Completed"
                      className="!text-green-600 font-semibold"
                    >
                      Completed
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Button
              className="w-full ms-auto transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
