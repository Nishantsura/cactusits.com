"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/upload-utils";
import { X, AlertTriangle, Loader2 } from "lucide-react";

interface ImageUploadProps {
  onImageUploaded: (url: string, path?: string) => void;
  currentImageUrl?: string;
  label?: string;
  folder?: string;
  subfolder?: string;
}

export default function ImageUpload({
  onImageUploaded,
  currentImageUrl = "",
  label = "Upload Image",
  folder = "general",
  subfolder,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset any previous errors
    setUploadError(null);
    setIsUploading(true);

    try {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(
          "File size exceeds 5MB limit. Please choose a smaller image.",
        );
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed.");
      }

      // Upload to Supabase Storage
      const { data, error } = await uploadImage(file, folder, subfolder);

      if (error) throw error;

      if (data?.url) {
        // Set preview and notify parent component
        setPreviewUrl(data.url);
        onImageUploaded(data.url, data.path);
      } else {
        throw new Error("Failed to get image URL after upload.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadError(
        err instanceof Error
          ? err.message
          : "Failed to upload image. Please try again.",
      );
    } finally {
      setIsUploading(false);
      // Clear the file input so the same file can be selected again
      e.target.value = "";
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    onImageUploaded("", "");
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {previewUrl ? (
        <div className="mb-4 relative">
          <div className="group relative w-40 h-40 border rounded-md overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 break-all">{previewUrl}</p>
        </div>
      ) : (
        <div className="mb-4 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <p className="text-sm text-gray-500">
            Upload an image or drag and drop
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
        </div>
      )}

      {uploadError && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertTriangle className="text-red-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-primary file:text-white
          hover:file:bg-primary/90
          disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isUploading}
      />

      {isUploading && (
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}
    </div>
  );
}
