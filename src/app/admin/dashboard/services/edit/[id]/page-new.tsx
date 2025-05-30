"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Plus, Trash } from "lucide-react";
import { getServiceById, updateService } from "@/lib/data-utils";
import { uploadServiceImage } from "@/lib/storage-utils";
import React from "react";

// Type definitions for service data
interface ServiceCardType {
  title: string;
  description: string;
  icon: string;
}

interface ServiceFormData {
  // Basic info
  id?: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  long_description: string;
  icon_name: string;
  accent_color: string;
  accent_position: string;
  order_index: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;

  // Hero section
  hero_service: string;
  hero_title: string;
  hero_description: string;
  hero_bulletpoints: string[];
  hero_image: string;

  // Potential section
  potential_description: string;
  potential_service_cards: ServiceCardType[];
}

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap params with React.use
  const unwrappedParams = React.use(params) as { id: string };
  const { id } = unwrappedParams;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "hero" | "potential">(
    "basic",
  );
  const serviceId = parseInt(id);

  // States for adding new items
  const [newBulletpoint, setNewBulletpoint] = useState("");
  const [newCard, setNewCard] = useState<ServiceCardType>({
    title: "",
    description: "",
    icon: "",
  });

  // Form state
  const [formData, setFormData] = useState<ServiceFormData>({
    // Basic info
    title: "",
    slug: "",
    description: "",
    short_description: "",
    long_description: "",
    icon_name: "",
    accent_color: "",
    accent_position: "",
    order_index: 0,
    is_active: true,

    // Hero section
    hero_service: "",
    hero_title: "",
    hero_description: "",
    hero_bulletpoints: [],
    hero_image: "",

    // Potential section
    potential_description: "",
    potential_service_cards: [],
  });

  // Available icon options
  const iconOptions = [
    "Settings",
    "BarChart",
    "Database",
    "Server",
    "Link",
    "Code",
    "Activity",
    "Moon",
    "Sun",
    "Star",
    "Image",
    "FileText",
    "MessageSquare",
    "Mail",
    "Layers",
    "Package",
    "Briefcase",
    "ShieldCheck",
    "Globe",
    "Zap",
    "Share",
    "Search",
    "Award",
    "Users",
    "MessageCircle",
    "Heart",
    "Smile",
    "Crosshair",
    "Terminal",
  ];

  useEffect(() => {
    const fetchServiceData = async () => {
      if (isNaN(serviceId)) {
        setError("Invalid service ID");
        setIsFetching(false);
        return;
      }

      try {
        // Check authentication
        const authData = localStorage.getItem("adminAuth");
        if (!authData) {
          router.push("/admin");
          return;
        }

        try {
          const { authenticated, expires } = JSON.parse(authData);
          if (!authenticated || new Date(expires) < new Date()) {
            localStorage.removeItem("adminAuth");
            router.push("/admin");
            return;
          }
        } catch (e) {
          localStorage.removeItem("adminAuth");
          router.push("/admin");
          return;
        }

        // Fetch service data
        const { data, error } = await getServiceById(serviceId);

        if (error) {
          throw new Error("Failed to fetch service data");
        }

        if (!data) {
          throw new Error("Service not found");
        }

        // Parse JSON fields if they're stored as strings
        let heroPoints = [];
        let potentialCards = [];

        try {
          if (data.hero_bulletpoints) {
            heroPoints =
              typeof data.hero_bulletpoints === "string"
                ? JSON.parse(data.hero_bulletpoints)
                : data.hero_bulletpoints;
          }

          if (data.potential_service_cards) {
            potentialCards =
              typeof data.potential_service_cards === "string"
                ? JSON.parse(data.potential_service_cards)
                : data.potential_service_cards;
          }
        } catch (parseError) {
          console.error("Error parsing JSON fields:", parseError);
        }

        // Populate form with service data
        setFormData({
          // Basic info
          id: data.id,
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          short_description: data.short_description || "",
          long_description: data.long_description || "",
          icon_name: data.icon_name || "",
          accent_color: data.accent_color || "",
          accent_position: data.accent_position || "",

          order_index: data.order_index || 0,
          is_active: data.is_active !== false, // default to true if undefined
          created_at: data.created_at,
          updated_at: data.updated_at,

          // Hero section
          hero_service: data.hero_service || "",
          hero_title: data.hero_title || "",
          hero_description: data.hero_description || "",
          hero_bulletpoints: Array.isArray(heroPoints) ? heroPoints : [],
          hero_image: data.hero_image || "",

          // Potential section
          potential_description: data.potential_description || "",
          potential_service_cards: Array.isArray(potentialCards)
            ? potentialCards
            : [],
        });
      } catch (err: any) {
        console.error("Error fetching service:", err);
        setError(
          err.message || "An error occurred while fetching service data",
        );
      } finally {
        setIsFetching(false);
      }
    };

    fetchServiceData();
  }, [serviceId, router]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Convert to number if it's a numeric field
    if (name === "order_index") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else if (name === "is_active") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // Only auto-generate slug if user hasn't manually edited it
      slug:
        formData.slug === slugify(prev.title) ? slugify(title) : formData.slug,
    }));
  };

  // Simple function to convert title to slug
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
  };

  // Handle adding a bulletpoint
  const handleAddBulletpoint = () => {
    if (newBulletpoint.trim()) {
      setFormData((prev) => ({
        ...prev,
        hero_bulletpoints: [...prev.hero_bulletpoints, newBulletpoint.trim()],
      }));
      setNewBulletpoint("");
    }
  };

  // Handle removing a bulletpoint
  const handleRemoveBulletpoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hero_bulletpoints: prev.hero_bulletpoints.filter((_, i) => i !== index),
    }));
  };

  // Handle adding a service card
  const handleAddCard = () => {
    if (!newCard.title.trim() || !newCard.description.trim()) return;

    setFormData((prev) => ({
      ...prev,
      potential_service_cards: [
        ...prev.potential_service_cards,
        { ...newCard },
      ],
    }));
    setNewCard({ title: "", description: "", icon: "" });
  };

  // Handle removing a card
  const handleRemoveCard = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      potential_service_cards: prev.potential_service_cards.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  // Handle hero image upload
  const handleHeroImageUpload = async (file: File) => {
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);

      // Use the service slug or generate a temporary one if needed
      const slugToUse = formData.slug || `service-${serviceId}`;

      const publicUrl = await uploadServiceImage(file, slugToUse);

      setFormData((prev) => ({
        ...prev,
        hero_image: publicUrl,
      }));
    } catch (err: any) {
      console.error("Error uploading image:", err);
      setError(err.message || "Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit form to update service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await updateService(serviceId, formData);

      if (error) throw error;

      alert("Service updated successfully!");
      router.push("/admin/dashboard/services");
    } catch (err: any) {
      console.error("Error updating service:", err);
      setError(err.message || "Failed to update service");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              href="/admin/dashboard/services"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Edit Service</h1>
          </div>
          <div
            className="bg-white rounded-lg shadow p-6 flex items-center justify-center"
            style={{ minHeight: "300px" }}
          >
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading service data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link
              href="/admin/dashboard/services"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">
              Edit Service: {formData.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            Save Changes
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Service form */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            {/* Form tabs */}
            <div className="mb-6 border-b border-gray-200">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("basic")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "basic" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300"}`}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("hero")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "hero" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300"}`}
                >
                  Hero Section
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("potential")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "potential" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300"}`}
                >
                  Potential Section
                </button>
              </div>
            </div>

            {/* Basic Info Tab */}
            <div
              className="space-y-6"
              style={{ display: activeTab === "basic" ? "block" : "none" }}
            >
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors font-mono"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL-friendly identifier for this service.
                </p>
              </div>

              {/* Two column layout for icon and order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Icon Name */}
                <div>
                  <label
                    htmlFor="icon_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Icon Name
                  </label>
                  <select
                    id="icon_name"
                    name="icon_name"
                    value={formData.icon_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  >
                    <option value="">-- Select an icon --</option>
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon || "None"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Order Index */}
                <div>
                  <label
                    htmlFor="order_index"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="order_index"
                    name="order_index"
                    value={formData.order_index}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                ></textarea>
              </div>

              {/* Short Description */}
              <div>
                <label
                  htmlFor="short_description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Short Description
                </label>
                <textarea
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                ></textarea>
              </div>

              {/* Long Description */}
              <div>
                <label
                  htmlFor="long_description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Long Description
                </label>
                <textarea
                  id="long_description"
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                ></textarea>
              </div>

              {/* Accent Color */}
              <div>
                <label
                  htmlFor="accent_color"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Accent Color
                </label>
                <input
                  type="text"
                  id="accent_color"
                  name="accent_color"
                  value={formData.accent_color}
                  onChange={handleChange}
                  placeholder="bg-purple-500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              {/* Accent Position */}
              <div>
                <label
                  htmlFor="accent_position"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Accent Position
                </label>
                <select
                  id="accent_position"
                  name="accent_position"
                  value={formData.accent_position}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                >
                  <option value="">-- Select a position --</option>
                  <option value="top-right">Top Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
            </div>

            {/* Hero Section Tab */}
            <div
              className="space-y-6"
              style={{ display: activeTab === "hero" ? "block" : "none" }}
            >
              {/* Hero Service (Main title) */}
              <div>
                <label
                  htmlFor="hero_service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="hero_service"
                  name="hero_service"
                  value={formData.hero_service}
                  onChange={handleChange}
                  placeholder="IT CONSULTING, STRATEGY & SERVICES"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Hero Title */}
              <div>
                <label
                  htmlFor="hero_title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hero Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="hero_title"
                  name="hero_title"
                  value={formData.hero_title}
                  onChange={handleChange}
                  placeholder="Redefine Your Business Strategy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Hero Description */}
              <div>
                <label
                  htmlFor="hero_description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hero Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="hero_description"
                  name="hero_description"
                  value={formData.hero_description}
                  onChange={handleChange}
                  placeholder="Empower your business with actionable insights and innovative strategies."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Hero Bulletpoints */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bulletpoints
                </label>

                {/* Current bulletpoints */}
                {formData.hero_bulletpoints.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {formData.hero_bulletpoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 p-2 rounded"
                      >
                        <span className="flex-1 mr-2">{point}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBulletpoint(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new bulletpoint */}
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newBulletpoint}
                      onChange={(e) => setNewBulletpoint(e.target.value)}
                      placeholder="Add a bulletpoint"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddBulletpoint}
                    className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                  >
                    <Plus size={16} className="mr-1" />
                    Add
                  </button>
                </div>
              </div>

              {/* Hero Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image
                </label>

                {/* Preview current image if exists */}
                {formData.hero_image && (
                  <div className="mb-3">
                    <Image
                      src={formData.hero_image}
                      alt="Hero image preview"
                      width={300}
                      height={200}
                      className="rounded-md object-cover h-[200px] w-[300px]"
                    />
                  </div>
                )}

                {/* File upload input */}
                <div className="flex items-end gap-2">
                  <input
                    type="file"
                    id="hero_image_upload"
                    accept="image/jpeg,image/jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleHeroImageUpload(e.target.files[0]);
                      }
                    }}
                    className="w-full text-sm text-gray-500 
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-medium
                              file:bg-gray-100 file:text-gray-700
                              hover:file:bg-gray-200"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a JPG image to display in the hero section. Recommended
                  size: 1000x800px.
                </p>
              </div>
            </div>

            {/* Potential Section Tab */}
            <div
              className="space-y-6"
              style={{ display: activeTab === "potential" ? "block" : "none" }}
            >
              {/* Potential Description */}
              <div>
                <label
                  htmlFor="potential_description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Potential Description
                </label>
                <textarea
                  id="potential_description"
                  name="potential_description"
                  value={formData.potential_description}
                  onChange={handleChange}
                  placeholder="At Cactus, we help organisations unlock their full potential through tailored consulting services..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              {/* Service Cards */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Cards
                </label>

                {/* Current service cards */}
                {formData.potential_service_cards.length > 0 && (
                  <div className="mb-4 space-y-3">
                    {formData.potential_service_cards.map((card, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{card.title}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCard(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          Icon: {card.icon}
                        </div>
                        <div className="text-sm">{card.description}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new service card */}
                <div className="border border-gray-200 rounded-md p-3 space-y-3">
                  <h4 className="text-sm font-medium">Add Service Card</h4>

                  {/* Card Title */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newCard.title}
                      onChange={(e) =>
                        setNewCard({ ...newCard, title: e.target.value })
                      }
                      placeholder="Business Strategy"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {/* Card Icon */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Icon
                    </label>
                    <select
                      value={newCard.icon}
                      onChange={(e) =>
                        setNewCard({ ...newCard, icon: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select an icon</option>
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon || "None"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Card Description */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newCard.description}
                      onChange={(e) =>
                        setNewCard({ ...newCard, description: e.target.value })
                      }
                      placeholder="Align your business goals with technology for sustainable growth."
                      rows={2}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCard}
                    className="flex items-center px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                  >
                    <Plus size={14} className="mr-1" />
                    Add Card
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
