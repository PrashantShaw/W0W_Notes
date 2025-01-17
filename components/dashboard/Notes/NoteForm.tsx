"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { INote, NoteFormData, ZNoteSchema } from "@/lib/utils/definitions";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheckBig, LoaderCircle } from "lucide-react";
import { createOrUpdateNoteAction } from "@/lib/actions/dashboard.actions";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const defaultValues = {
  title: "",
  description: "",
  priority: "Medium",
  status: "Backlog",
  label: "Bug",
};

type NoteFormProps = {
  formValues?: INote;
};

export function NoteForm({ formValues }: NoteFormProps) {
  const form = useForm<NoteFormData>({
    resolver: zodResolver(ZNoteSchema),
    defaultValues: formValues ?? defaultValues,
  });
  const router = useRouter();
  const isEditing = !!formValues;

  async function onSubmit(data: NoteFormData) {
    // console.log('Create Note Data :: ', data)
    const result = await createOrUpdateNoteAction(data, formValues?._id);
    // console.log('Create Note Result :: ', result)

    if (result.success) {
      toast({
        description: (
          <div className="flex items-center gap-4 mb-2">
            <CircleCheckBig color="green" />
            <p className="font-semibold text-secondary-foreground">
              {result.message}
            </p>
          </div>
        ),
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: result?.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <div className="grid sm:grid-cols-3 gap-5 ">
          <FormField
            control={form.control}
            name="priority"
            render={({ field, fieldState: { error } }) => (
              <FormItem className=" relative">
                <FormLabel className="text-secondary-foreground">
                  Priority
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="shadow-sm">
                      <SelectValue placeholder="Select the Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field, fieldState: { error } }) => (
              <FormItem className=" relative">
                <FormLabel className="text-secondary-foreground">
                  Status
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="shadow-sm">
                      <SelectValue placeholder="Select the Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ToDo">ToDo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="Backlog">Backlog</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field, fieldState: { error } }) => (
              <FormItem className=" relative">
                <FormLabel className="text-secondary-foreground">
                  Label
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="shadow-sm">
                      <SelectValue placeholder="Select the Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Feature">Feature</SelectItem>
                    <SelectItem value="Documentation">Documentation</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs absolute -bottom-5 left-0" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <FormItem className=" relative">
              <FormLabel className="text-secondary-foreground">Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter the Title"
                  className={clsx(
                    "shadow-sm",
                    error
                      ? "ring-2 ring-red-600 focus-visible:ring-red-600"
                      : ""
                  )}
                />
              </FormControl>
              <FormMessage className="text-xs absolute -bottom-5 left-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <FormItem className=" relative">
              <FormLabel className="text-secondary-foreground">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder="Description of the Note"
                  className={clsx(
                    "shadow-sm resize-none",
                    error
                      ? "ring-2 ring-red-600 focus-visible:ring-red-600"
                      : ""
                  )}
                />
              </FormControl>
              <FormMessage className="text-xs absolute -bottom-5 left-0" />
            </FormItem>
          )}
        />
        <div className="flex flex-row flex-wrap gap-3 pt-6">
          {isEditing ? (
            <EditNoteButton isSumitting={form.formState.isSubmitting} />
          ) : (
            <CreateNoteButton isSumitting={form.formState.isSubmitting} />
          )}
          <Button
            type="button"
            className=" w-[12rem]"
            variant={"secondary"}
            asChild
          >
            <Link href={"/dashboard"}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

const CreateNoteButton = ({ isSumitting = false }) => {
  const btnTxt = isSumitting ? "Creating" : "Create Note";
  const btnIcon = isSumitting ? (
    <LoaderCircle className="animate-spin mr-3" />
  ) : (
    ""
  );
  return (
    <Button disabled={isSumitting} type="submit" className="shadow w-[12rem]">
      {btnIcon} {btnTxt}
    </Button>
  );
};
const EditNoteButton = ({ isSumitting = false }) => {
  const btnTxt = isSumitting ? "Saving" : "Save";
  const btnIcon = isSumitting ? (
    <LoaderCircle className="animate-spin mr-3" />
  ) : (
    ""
  );
  return (
    <Button disabled={isSumitting} type="submit" className="shadow w-[12rem]">
      {btnIcon} {btnTxt}
    </Button>
  );
};

/**
 * title
 * description
 * priority -> Low|Medium|High
 * status -> ToDo|In Progress|Cancelled|Done|Backlog
 * label -> Bug|Feature|Documentation
 */
