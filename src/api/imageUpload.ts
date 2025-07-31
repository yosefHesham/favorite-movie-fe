export async function uploadImage(file: File) {
  const url = import.meta.env.VITE_IMAGE_UPLOAD_URL;

  const apiKey = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
  const formData = new FormData();
  formData.append("api_key", apiKey);
  formData.append("file", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Upload failed:", error);
  }
}
