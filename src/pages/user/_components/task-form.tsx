import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { addTaskSchema } from "@/schema";
import { Combobox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { cn } from "@/lib/utils";
import { useGetProjectListMutation } from "@/store/api/project";

const TaskForm = () => {
  const [getProjectList, { isLoading, data: projectLists, error }] =
    useGetProjectListMutation();

  const fetchProjectLists = async () => {
    try {
      const response = await getProjectList().unwrap();
      console.log("Projects:", response);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjectLists();
  }, []);

  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      date: new Date().toISOString(),
      project: "",
      service: "",
      purpose: "",
      startDate: "",
      startTime: "",
      finishDate: "",
      finishTime: "",
      status: "Initiated",
    },
  });

  function onSubmit(values: z.infer<typeof addTaskSchema>) {
    console.log(values);
  }

  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar p-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div
            className={cn(
              "grid gap-2",
              form.watch("project") ? "grid-cols-2" : "grid-cols-1"
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
                        disabled={isLoading}
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
            {form.watch("project") && (
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
                          disabled={isLoading}
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
                    placeholder="Define Project Purpose Here"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center  gap-2">
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
                      onChange={(e) => {
                        field.onChange(e?.toISOString());
                      }}
                      btnDisabled={isLoading}
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
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(e) => {
                        field.onChange(e?.toISOString());
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center  gap-2">
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
                      onChange={(e) => {
                        field.onChange(e?.toISOString());
                      }}
                      btnDisabled={isLoading}
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
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(e) => {
                        field.onChange(e?.toISOString());
                      }}
                      disabled={isLoading}
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
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`
                      ${
                        field.value === "Initiated"
                          ? "!text-blue-600 font-semibold"
                          : ""
                      }
                      ${
                        field.value === "Ongoing"
                          ? "!text-yellow-600 font-semibold"
                          : ""
                      }
                      ${
                        field.value === "Completed"
                          ? "!text-green-600 font-semibold"
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
            <Button className="ms-auto" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskForm;
