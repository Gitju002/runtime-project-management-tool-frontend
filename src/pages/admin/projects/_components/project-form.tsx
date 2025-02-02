import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { addProjectSchema } from "@/schema";
import { Combobox } from "@/components/ui/combo-box";
import {
  useCreateProjectMutation,
  useGetProjectListQuery,
} from "@/store/api/project";

export default function ProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectDate: "",
      projectPeriod: 0,
      clientName: "",
      clientEmail: "",
      projectType: "",
      cost: 0,
    },
  });

  const { data: projectLists, isLoading: isProjectLoading } =
    useGetProjectListQuery();

  async function onSubmit(values: z.infer<typeof addProjectSchema>) {
    setLoading(true); // Start loading
    console.log("values", values);
    try {
      const response = await createProject(values).unwrap();
      if (response.success) {
        form.reset();
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setLoading(false); // End loading
    }
  }

  return (
    <div className="max-h-[600px] overflow-y-scroll no-scrollbar p-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Project Name */}
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <div className="w-full">
                    {/* <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isProjectLoading}
                      data={projectLists?.data?.map((item) => ({
                        label: item,
                        value: item,
                      }))}
                    /> */}
                    <Input
                      placeholder="Enter project name"
                      {...field}
                      disabled={loading} // Disabled when loading
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Project Description */}
          <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter project description"
                    {...field}
                    disabled={loading} // Disabled when loading
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Date & Period */}
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="projectDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      placeholder="Pick start date"
                      value={field.value ? new Date(field.value) : new Date()}
                      onChange={(e) => {
                        field.onChange(e?.toISOString());
                      }}
                      btnDisabled={loading} // Disabled when loading
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectPeriod"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Project Period</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project period"
                      type="number"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value) || 0);
                      }}
                      disabled={loading} // Disabled when loading
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Client Name & Email */}
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter client name"
                      {...field}
                      disabled={loading} // Disabled when loading
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientEmail"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel>Client Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter client email"
                      {...field}
                      disabled={loading} // Disabled when loading
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project type"
                      {...field}
                      disabled={loading} // Disabled when loading
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter project cost"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value) || 0);
                      }}
                      disabled={loading} // Disabled when loading
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading} // Disabled when loading
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
