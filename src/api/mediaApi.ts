/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "../config";
import type { MediaEntry, MediaFormData } from "../types";

const MEDIA_URL = `${API_BASE_URL}/media`;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch (e) {
      errorData.message =
        response.statusText ||
        (typeof e === "object" && e !== null && "toString" in e
          ? (e as Error).toString()
          : String(e)) ||
        `Request failed with status ${response.status}`;
    }
    throw new Error(errorData.message || "An unknown error occurred");
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return {} as T;
}

export interface FetchMediaResponse {
  data: MediaEntry[];
  meta: {
    limit: number;
    total: number;
    totalPages: number;
    page: number;
  };
}

export async function fetchMedia(
  page: number,
  limit: number = 10
): Promise<FetchMediaResponse> {
  const response = await fetch(`${MEDIA_URL}?page=${page}&limit=${limit}`);
  return handleResponse<FetchMediaResponse>(response);
}

export async function createMedia(data: MediaFormData): Promise<MediaEntry> {
  const response = await fetch(MEDIA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<MediaEntry>(response);
}

export async function updateMedia(
  id: string,
  data: MediaFormData
): Promise<MediaEntry> {
  const response = await fetch(`${MEDIA_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse<MediaEntry>(response);
}

export async function deleteMedia(id: string): Promise<void> {
  const response = await fetch(`${MEDIA_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse<void>(response);
}
