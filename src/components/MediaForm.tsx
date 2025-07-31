import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import type { MediaEntry, MediaFormData } from "../types";

interface MediaFormProps {
  onSubmit: (data: MediaFormData) => void;
  initialData?: MediaEntry | null; // For editing
  isSubmitting: boolean;
}

const MediaForm: React.FC<MediaFormProps> = ({
  onSubmit,
  initialData,
  isSubmitting,
}) => {
  const form = useForm<MediaFormData>({
    defaultValues: initialData || {
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      yearTime: "",
    },
  });

  // Reset form when initialData changes (for switching between add/edit)
  useEffect(() => {
    form.reset(
      initialData || {
        title: "",
        type: "Movie",
        director: "",
        budget: "",
        location: "",
        duration: "",
        yearTime: "",
      }
    );
  }, [initialData, form]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {initialData ? "Edit Entry" : "Add New Entry"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Movie">Movie</SelectItem>
                    <SelectItem value="TV Show">TV Show</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="director"
            rules={{ required: "Director is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Director</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            rules={{ required: "Budget is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            rules={{ required: "Duration is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearTime"
            rules={{ required: "Year/Time is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year/Time</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? initialData
                ? "Updating..."
                : "Adding..."
              : initialData
              ? "Update Entry"
              : "Add Entry"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MediaForm;
