"use client";

import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

interface ImageUrlInputProps {
  onImageUrlChanged: (url: string, path?: string) => void;
  currentImageUrl?: string;
  label?: string;
}

export default function ImageUpload({
  onImageUrlChanged,
  currentImageUrl = "",
  label = "Image URL",
}: ImageUrlInputProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const [error, setError] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    setError(null);
  };

  const handleApplyUrl = () => {
    if (!imageUrl) {
      setError("Please enter an image URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(imageUrl);
      setPreviewUrl(imageUrl);
      onImageUrlChanged(imageUrl, "");
      setError(null);
    } catch (err) {
      setError("Please enter a valid URL");
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    setImageUrl("");
    onImageUrlChanged("", "");
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
          <p className="text-sm text-gray-500">Enter an image URL below</p>
          <p className="text-xs text-gray-400 mt-1">
            URL should point directly to an image file
          </p>
        </div>
      )}

      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={imageUrl}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
        />
        <button
          type="button"
          onClick={handleApplyUrl}
          className="px-3 py-2 bg-primary text-white rounded-md text-sm flex items-center"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Apply
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        Enter a direct URL to an image. You can use services like Unsplash,
        Imgur, or your own hosting.
      </p>
    </div>
  );
}
