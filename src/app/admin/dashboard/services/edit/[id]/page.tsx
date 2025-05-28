"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Plus, Trash, Edit2, Upload } from "lucide-react";
import { getServiceById, updateService } from "@/lib/data-utils";
import { uploadImage } from "@/lib/upload-utils";
import React from "react";
import ImageUpload from "@/components/admin/ImageUpload";

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
  image: string;
  image_path: string;
  image_position: string;
  image_width: number;
  image_height: number;
  image_alt: string;
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
    image: "",
    image_path: "",
    image_position: "",
    image_width: 500,
    image_height: 500,
    image_alt: "",
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

  // Image upload states
  const [uploadError, setUploadError] = useState<string | null>(null);

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
          image: data.image || "",
          image_path: data.image_path || "",
          image_position: data.image_position || "",
          image_width: data.image_width || 500,
          image_height: data.image_height || 500,
          image_alt: data.image_alt || "",
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
    if (
      name === "order_index" ||
      name === "image_width" ||
      name === "image_height"
    ) {
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

  // Handle image upload
  const handleImageUpload = (url: string, path?: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
      image_path: path || "",
    }));
  };

  // Handle hero image upload
  const handleHeroImageUpload = (url: string, path?: string) => {
    setFormData((prev) => ({
      ...prev,
      hero_image: url,
    }));
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
        <div className="flex items-center mb-6">
          <Link
            href="/admin/dashboard/services"
            className="text-gray-500 hover:text-gray-700 mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Service: {formData.title}</h1>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Service form */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className={`px-4 py-3 font-medium text-sm ${activeTab === "basic" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
              >
                Basic Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hero")}
                className={`px-4 py-3 font-medium text-sm ${activeTab === "hero" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
              >
                Hero Section
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("potential")}
                className={`px-4 py-3 font-medium text-sm ${activeTab === "potential" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"}`}
              >
                Potential Section
              </button>
            </nav>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Hero section fields - Placeholder */}
            {activeTab === "hero" && (
              <div className="p-6 space-y-6">
                {/* Hero Service Name */}
                <div>
                  <label
                    htmlFor="hero_service"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hero Service Name
                  </label>
                  <input
                    type="text"
                    id="hero_service"
                    name="hero_service"
                    value={formData.hero_service}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Hero Title */}
                <div>
                  <label
                    htmlFor="hero_title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hero Title
                  </label>
                  <input
                    type="text"
                    id="hero_title"
                    name="hero_title"
                    value={formData.hero_title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Hero Description */}
                <div>
                  <label
                    htmlFor="hero_description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hero Description
                  </label>
                  <textarea
                    id="hero_description"
                    name="hero_description"
                    value={formData.hero_description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Hero Image Upload */}
                <div>
                  <ImageUpload
                    onImageUploaded={handleHeroImageUpload}
                    currentImageUrl={formData.hero_image}
                    label="Hero Image"
                    folder="services"
                    subfolder="hero"
                  />
                </div>

                {/* Hero Bullet Points */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Bullet Points
                  </label>
                  {formData.hero_bulletpoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => {
                          const newPoints = [...formData.hero_bulletpoints];
                          newPoints[index] = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            hero_bulletpoints: newPoints,
                          }));
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBulletpoint(index)} // Assuming handleRemoveBulletpoint exists
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={newBulletpoint} // Assuming newBulletpoint state exists
                      onChange={(e) => setNewBulletpoint(e.target.value)} // Assuming setNewBulletpoint exists
                      placeholder="Add a new bullet point"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleAddBulletpoint} // Assuming handleAddBulletpoint exists
                      className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Basic Info Tab - Placeholder */}
            {activeTab === "basic" && (
              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Name*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Slug*
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Icon */}
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
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select an icon</option>
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
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
                    placeholder="e.g. #3B82F6 or blue-500"
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a position</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
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
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
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
                    rows={5}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                  <ImageUpload
                    onImageUploaded={handleImageUpload}
                    currentImageUrl={formData.image}
                    label="Service Image"
                    folder="services"
                  />
                  {uploadError && (
                    <p className="text-red-500 text-xs mt-1">{uploadError}</p>
                  )}
                </div>

                {/* Image Alt Text */}
                <div>
                  <label
                    htmlFor="image_alt"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    id="image_alt"
                    name="image_alt"
                    value={formData.image_alt}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Order Index */}
                <div>
                  <label
                    htmlFor="order_index"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Order Index
                  </label>
                  <input
                    type="number"
                    id="order_index"
                    name="order_index"
                    value={formData.order_index}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Is Active */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor="is_active"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Is Active
                  </label>
                </div>
              </div>
            )}

            {/* Potential section fields - Placeholder */}
            {activeTab === "potential" && (
              <div className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="potential_description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Potential Section Description
                  </label>
                  <textarea
                    id="potential_description"
                    name="potential_description"
                    value={formData.potential_description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Potential Service Cards
                  </h3>
                  {formData.potential_service_cards.map((card, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 rounded-md mb-4 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-semibold">
                          Card {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveCard(index)} // Assuming handleRemoveCard exists
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                      <div>
                        <label
                          htmlFor={`card_title_${index}`}
                          className="block text-xs font-medium text-gray-600 mb-1"
                        >
                          Card Title
                        </label>
                        <input
                          type="text"
                          id={`card_title_${index}`}
                          value={card.title}
                          onChange={(e) => {
                            const newCards = [
                              ...formData.potential_service_cards,
                            ];
                            newCards[index].title = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              potential_service_cards: newCards,
                            }));
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        ></input>
                      </div>
                      <div>
                        <label
                          htmlFor={`card_description_${index}`}
                          className="block text-xs font-medium text-gray-600 mb-1"
                        >
                          Card Description
                        </label>
                        <textarea
                          id={`card_description_${index}`}
                          value={card.description}
                          onChange={(e) => {
                            const newCards = [
                              ...formData.potential_service_cards,
                            ];
                            newCards[index].description = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              potential_service_cards: newCards,
                            }));
                          }}
                          rows={2}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        ></textarea>
                      </div>
                      <div>
                        <label
                          htmlFor={`card_icon_${index}`}
                          className="block text-xs font-medium text-gray-600 mb-1"
                        >
                          Card Icon
                        </label>
                        <select
                          id={`card_icon_${index}`}
                          value={card.icon}
                          onChange={(e) => {
                            const newCards = [
                              ...formData.potential_service_cards,
                            ];
                            newCards[index].icon = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              potential_service_cards: newCards,
                            }));
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="">Select an icon</option>
                          {iconOptions.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md space-y-3">
                    <h4 className="text-md font-semibold">Add New Card</h4>
                    <div>
                      <label
                        htmlFor="new_card_title"
                        className="block text-xs font-medium text-gray-600 mb-1"
                      >
                        New Card Title
                      </label>
                      <input
                        type="text"
                        id="new_card_title"
                        value={newCard.title} // Assuming newCard state exists
                        onChange={(e) =>
                          setNewCard((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        } // Assuming setNewCard exists
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="new_card_description"
                        className="block text-xs font-medium text-gray-600 mb-1"
                      >
                        New Card Description
                      </label>
                      <textarea
                        id="new_card_description"
                        value={newCard.description} // Assuming newCard state exists
                        onChange={(e) =>
                          setNewCard((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        } // Assuming setNewCard exists
                        rows={2}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="new_card_icon"
                        className="block text-xs font-medium text-gray-600 mb-1"
                      >
                        New Card Icon
                      </label>
                      <select
                        id="new_card_icon"
                        value={newCard.icon} // Assuming newCard state exists
                        onChange={(e) =>
                          setNewCard((prev) => ({
                            ...prev,
                            icon: e.target.value,
                          }))
                        } // Assuming setNewCard exists
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">Select an icon</option>
                        {iconOptions.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCard} // Assuming handleAddCard exists
                      className="mt-2 px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add Card
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Submit button - always visible */}
            <div className="bg-gray-50 px-6 py-3 flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
