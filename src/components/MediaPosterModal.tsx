import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
interface MediaPosterModalProps {
  onClose: () => void;
  movieImageUrl: string;
}

const MediaPosterModal: React.FC<MediaPosterModalProps> = ({
  onClose,
  movieImageUrl,
}) => {
  return (
    <Dialog open={Boolean(movieImageUrl)} onOpenChange={onClose}>
      <DialogContent className="flex  flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Movie Poster</DialogTitle>
        </DialogHeader>
        <img src={movieImageUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default MediaPosterModal;
