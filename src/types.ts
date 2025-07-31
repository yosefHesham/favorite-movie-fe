export interface MediaEntry {
  id: string;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  imageUrl?: string;
}

export interface MediaFormData {
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  imageUrl: string;
}
