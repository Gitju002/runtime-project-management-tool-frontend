import { zodResolver } from "@hookform/resolvers/zod";
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
import { Combobox } from "@/components/ui/combo-box";
import { useState } from "react";
import { useGetProjectListQuery } from "@/store/api/project";
import { useCreateProjectTypeDescMutation } from "@/store/api/projectTypeDesc";

const projectTypeSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project type must be at least 2 characters.",
  }),
  typeDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  location: z.string().optional(),
});

const existingProjects = [
  { value: "cosmos", label: "Cosmos DashBoard" },
  { value: "jaro", label: "Jaro for Education" },
  { value: "academy", label: "The Academy Group" },
  { value: "invespy", label: "Invespy for Real Estate" },
];

export default function ProjectTypeForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [selectedExistingProjects, setSelectedExistingProjects] = useState(
    existingProjects[0]?.value || ""
  );

  const [
    createProjectTypeDesc,
    {
      data: createdProjectType,
      isLoading: isCreatingProjectType,
      isSuccess: isProjectTypeCreated,
    },
  ] = useCreateProjectTypeDescMutation();

  const { data: projectLists, isLoading: isProjectLoading } =
    useGetProjectListQuery();

  const form = useForm<z.infer<typeof projectTypeSchema>>({
    resolver: zodResolver(projectTypeSchema),
    defaultValues: {
      projectName: "",
      typeDescription: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof projectTypeSchema>) {
    console.log(values);
    const response = await createProjectTypeDesc({
      project: values.projectName,
      projectTypeDescription: values.typeDescription,
      location: values.location,
    });

    if (response?.data?.success) {
      form.reset();
      onSuccess();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <div className="w-full">
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isProjectLoading}
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
        <FormField
          control={form.control}
          name="typeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter project type description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
