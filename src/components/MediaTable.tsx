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
import LoadingSpinner from "./Spinner";
import { fetchMedia, type FetchMediaResponse } from "../api/mediaApi";

interface MediaTableProps {
  onEdit: (entry: MediaEntry) => void;
  onDelete: (id: string) => void;
  refreshTrigger: number;
}

const MediaTable: React.FC<MediaTableProps> = ({
  onEdit,
  onDelete,
  refreshTrigger,
}) => {
  const [media, setMedia] = useState<MediaEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const loadMedia = useCallback(
    async (pageNum: number, resetData: boolean = false) => {
      setLoading(true);
      setError(null);
      try {
        const data: FetchMediaResponse = await fetchMedia(pageNum, 20);

        if (resetData) {
          setMedia(data.records);
        } else {
          setMedia((prevMedia) => [...prevMedia, ...data.records]);
        }

        setHasMore(data.records.length > 0 && data.hasNextPage);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error("Failed to load media:", e);
        setError(`Failed to load entries: ${e.message}`);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadMedia(page);
  }, [page, loadMedia]);

  useEffect(() => {
    if (refreshTrigger > 0) {
      setMedia([]);
      setPage(1);
      setHasMore(true);
      loadMedia(1, true);
    }
  }, [refreshTrigger, loadMedia]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Favorite Movies & TV Shows
      </h2>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Year/Time</TableHead>
              <TableHead>Other Details</TableHead>
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
                      onClick={() => onEdit(entry)}
                    >
                      Edit
                    </Button>
                    <Button
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
