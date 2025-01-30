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
import { useGetProjectListQuery } from "@/store/api/project";

const serviceSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  serviceName: z.string().min(2, {
    message: "Service name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export default function ServiceForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      projectName: "",
      serviceName: "",
      description: "",
    },
  });

  const { data: projectLists, isLoading: isProjectLoading } =
    useGetProjectListQuery();

  // const selectedProject = useWatch({ control: form.control, name: "project" });

  function onSubmit(values: z.infer<typeof serviceSchema>) {
    console.log(values);
    onSuccess();
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
          name="serviceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter service name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter service description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:shadow-teal-shade/35 "
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
