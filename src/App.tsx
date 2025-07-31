/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import MediaTable from "./components/MediaTable";
import type { MediaEntry, MediaFormData } from "./types";
import { createMedia, updateMedia, deleteMedia } from "./api/mediaApi";

import { toast } from "sonner";
import ConfirmationModal from "./components/ConfirmModal";
import { Toaster } from "./components/ui/sonner";
import MediaFormDialog from "./components/MediaFormModal";

function App() {
  const [editingEntry, setEditingEntry] = useState<MediaEntry | null>(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDeleteId, setEntryToDeleteId] = useState<string | null>(null);
  const [refreshTableTrigger, setRefreshTableTrigger] = useState(0);

  const showAppToast = useCallback(
    (message: string, type: "success" | "error" | "info") => {
      if (type === "success") {
        toast.success(message, {
          description: "Operation completed successfully.",
          duration: 3000,
        });
      } else if (type === "error") {
        toast.error(message, {
          description: "Please try again.",
          duration: 5000,
        });
      } else {
        // info
        toast.info(message, {
          description: "Information.",
          duration: 3000,
        });
      }
    },
    []
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = async (data: MediaFormData) => {
    setIsFormSubmitting(true);
    try {
      if (editingEntry) {
        await updateMedia(editingEntry.id, data);
      } else {
        await createMedia(data);
      }

      showAppToast(
        `Entry ${editingEntry ? "updated" : "added"} successfully!`,
        "success"
      );
      setEditingEntry(null);
      setIsDialogOpen(false);
      setRefreshTableTrigger((prev) => prev + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error submitting form:", error);
      showAppToast(`Error: ${error.message}`, "error");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleEdit = (entry: MediaEntry) => {
    setEditingEntry(entry);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id: string) => {
    setEntryToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!entryToDeleteId) return;

    setShowDeleteModal(false);
    try {
      await deleteMedia(entryToDeleteId);

      showAppToast("Entry deleted successfully!", "success");
      setEntryToDeleteId(null);
      setRefreshTableTrigger((prev) => prev + 1);
    } catch (error: any) {
      console.error("Error deleting entry:", error);
      showAppToast(`Error: ${error.message}`, "error");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEntryToDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
          Favorite Movies & TV Shows
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Manage your collection of cinematic masterpieces.
        </p>
      </header>

      <main className="container mx-auto space-y-12">
        <MediaTable
          onAddButtonClick={() => setIsDialogOpen(true)}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          refreshTrigger={refreshTableTrigger}
        />
      </main>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this entry? This action cannot be undone."
      />

      <MediaFormDialog
        onSubmit={handleFormSubmit}
        initialData={editingEntry}
        isSubmitting={isFormSubmitting}
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingEntry(null);
          }
        }}
      />
      <Toaster />
    </div>
  );
}

export default App;
