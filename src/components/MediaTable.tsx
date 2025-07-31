import React, { useEffect, useState, useRef, useCallback } from "react";
import type { MediaEntry } from "../types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { fetchMedia, type FetchMediaResponse } from "../api/mediaApi";
import LoadingSpinner from "./Spinner";
import MediaPosterModal from "./MediaPosterModal";

interface MediaTableProps {
  onEdit: (entry: MediaEntry) => void;
  onDelete: (id: string) => void;
  onAddButtonClick: () => void;
  refreshTrigger: number;
}

const MediaTable: React.FC<MediaTableProps> = ({
  onEdit,
  onDelete,
  onAddButtonClick,
  refreshTrigger,
}) => {
  const [media, setMedia] = useState<MediaEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isImagePosterOpen, setImagePosterOpen] = useState("");

  const hasInitialLoadOccurred = useRef(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (!loading && hasMore) {
            setTimeout(() => {
              setPage((prevPage) => prevPage + 1);
            }, 400);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );
  const totalMedia = useRef(0);
  const loadMedia = useCallback(
    async (pageNum: number, resetData: boolean = false) => {
      setLoading(true);
      setError(null);

      try {
        const data: FetchMediaResponse = await fetchMedia(pageNum, 10);
        totalMedia.current = data.meta.total;
        if (resetData) {
          setMedia(data.data || []);
        } else {
          setMedia((prevMedia) => [...prevMedia, ...(data.data || [])]);
        }
        const isLastPage = data.meta.page >= data.meta.totalPages;

        setHasMore(data.data.length > 0 && !isLastPage);
      } catch (e: unknown) {
        console.error("Failed to load media:", e);
        setError(`Failed to load entries: ${(e as Error).message}`);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!hasInitialLoadOccurred.current) {
      loadMedia(1, true);
      hasInitialLoadOccurred.current = true;
    } else if (page > 1) {
      loadMedia(page);
    }
  }, [page, loadMedia]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      setMedia([]);
      setPage(1);
      setHasMore(true);
      loadMedia(1, true);
      hasInitialLoadOccurred.current = true;
    }
  }, [refreshTrigger, loadMedia]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-[1400px] mx-auto overflow-x-auto">
      <MediaPosterModal
        onClose={() => {
          setImagePosterOpen("");
        }}
        movieImageUrl={isImagePosterOpen}
      />
      <div className="flex justify-between">
        <div className="mb-4">
          <h2 className="text-2xl font-bold  mb-2 text-gray-900">
            Favorite Movies & TV Shows {}
          </h2>
          <p>
            Showing {page * 10} of {totalMedia.current}
          </p>
        </div>
        <Button
          onClick={() => onAddButtonClick()}
          className="cursor-pointer font-bold text-lg px-4"
        >
          +
        </Button>
      </div>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div className="overflow-x-auto overflow-y-scroll  relative shadow-md sm:rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Movie Poster</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Year/Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {media.map((entry, index) => {
              const isLastElement = media.length === index + 1 && hasMore;
              return (
                <TableRow
                  ref={isLastElement ? lastElementRef : null}
                  key={entry.id}
                >
                  <TableCell>
                    <div className="flex  w-full justify-center">
                      <img
                        onClick={() => {
                          setImagePosterOpen(entry.imageUrl!);
                        }}
                        className="max-h-[30px] cursor-pointer"
                        src={entry.imageUrl}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.director}</TableCell>
                  <TableCell>{entry.budget}</TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                  <TableCell>{entry.yearTime}</TableCell>

                  <TableCell className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => {
                        onEdit(entry);
                        onAddButtonClick();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="cursor-pointer"
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(entry.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {loading && (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            )}
            {!hasMore && !loading && media.length > 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-600">
                  You've reached the end of the list.
                </TableCell>
              </TableRow>
            )}
            {!loading && media.length === 0 && !error && (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-600">
                  No entries found. Add your first movie or TV show!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MediaTable;
