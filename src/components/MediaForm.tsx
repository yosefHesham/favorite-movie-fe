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
import { toast } from "sonner";
import { uploadImage } from "../api/imageUpload";

interface MediaFormProps {
  onSubmit: (data: MediaFormData) => void;
  initialData?: MediaEntry | null;
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
      imageUrl: "",
    },
  });

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
        imageUrl: " ",
      }
    );
  }, [initialData, form]);

  return (
    <div className=" px-3 py-4 md:p-6 rounded-lg  mb-8 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poster Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      try {
                        const res = await uploadImage(file);
                        if (res.data === undefined) {
                          toast("error uploading");
                        }

                        field.onChange(res.data.url);
                      } catch (err) {
                        console.error("Image upload failed", err);
                        toast("Image upload failed");
                      }
                    }}
                  />
                </FormControl>
                <div className={`${field.value ? "hidden" : "block"}`}>
                  <img
                    src={field.value}
                    alt="Uploaded"
                    className="max-h-[80px] rounded border"
                  />
                </div>
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
