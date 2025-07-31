import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import MediaForm from "./MediaForm";
import type { MediaEntry, MediaFormData } from "../types";

interface MediaFormDialogProps {
  onSubmit: (data: MediaFormData) => void;
  initialData?: MediaEntry | null;
  isSubmitting: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MediaFormDialog: React.FC<MediaFormDialogProps> = ({
  onSubmit,
  initialData,
  isSubmitting,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl!  max-h-[94vh] mb-10 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Media Entry" : "Add New Media Entry"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Make changes to your media entry here."
              : "Fill in the details for your new media entry."}
          </DialogDescription>
        </DialogHeader>
        <MediaForm
          onSubmit={onSubmit}
          initialData={initialData}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MediaFormDialog;
