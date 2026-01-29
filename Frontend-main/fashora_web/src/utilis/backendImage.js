

export const getBackendImageUrl = (imagePath, type = "product") => {
  if (!imagePath) return null;

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5006";


  if (type === "category") {
    return `${baseUrl}/${imagePath}`;
  }
  

  
  if (type === "product") {
    const normalizedPath = imagePath.startsWith("uploads/")
      ? imagePath
      : `uploads/${imagePath}`;

    return `${baseUrl}/${normalizedPath}`;
  }

  // Default fallback (treat as product)
  const normalizedPath = imagePath.startsWith("uploads/")
    ? imagePath
    : `uploads/${imagePath}`;

  return `${baseUrl}/${normalizedPath}`;
};







