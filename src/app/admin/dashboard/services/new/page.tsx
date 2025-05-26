"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash, Edit2 } from "lucide-react";
import { createService } from "@/lib/data-utils";

// Type definitions for service data
interface ServiceCardType {
  title: string;
  description: string;
  icon: string;
}

interface ServiceFeatureType {
  id: string;
  title: string;
  icon: string;
}

interface ServiceDetailType {
  id: string;
  title: string;
  description: string;
  features: { id: string; title: string }[];
}

interface ServiceFormData {
  // Basic info
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  accent_color: string;
  accent_position: string;
  image: string;
  image_position: string;
  image_width: number;
  image_height: number;
  image_alt: string;
  order_index: number;
  is_active: boolean;

  // Hero section
  hero_service: string;
  hero_title: string;
  hero_description: string;
  hero_bulletpoints: string[];
  hero_image: string;

  // Potential section
  potential_description: string;
  potential_service_cards: ServiceCardType[];

  // Explore section
  explore_service_features: ServiceFeatureType[];
  explore_service_details: Record<string, ServiceDetailType>;
}

/**
 * Form for adding a new service to the database
 */
export default function NewServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "basic" | "hero" | "potential" | "explore"
  >("basic");

  // Form state
  const [formData, setFormData] = useState<ServiceFormData>({
    // Basic info
    title: "",
    slug: "",
    description: "",
    icon_name: "",
    accent_color: "",
    accent_position: "",
    image: "",
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

    // Explore section
    explore_service_features: [],
    explore_service_details: {},
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Convert to number if it's the order_index field
    if (name === "order_index") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
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
        formData.slug === "" || formData.slug === slugify(prev.title)
          ? slugify(title)
          : formData.slug,
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
  const [newBulletpoint, setNewBulletpoint] = useState("");
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

  // Handle adding a potential service card
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const handleAddCard = () => {
    if (
      newCard.title.trim() &&
      newCard.description.trim() &&
      newCard.icon.trim()
    ) {
      setFormData((prev) => ({
        ...prev,
        potential_service_cards: [...prev.potential_service_cards, newCard],
      }));
      setNewCard({ title: "", description: "", icon: "" });
    }
  };

  // Handle removing a service card
  const handleRemoveCard = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      potential_service_cards: prev.potential_service_cards.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  // Handle adding a service feature
  const [newFeature, setNewFeature] = useState({ id: "", title: "", icon: "" });
  const handleAddFeature = () => {
    if (
      newFeature.id.trim() &&
      newFeature.title.trim() &&
      newFeature.icon.trim()
    ) {
      setFormData((prev) => ({
        ...prev,
        explore_service_features: [
          ...prev.explore_service_features,
          newFeature,
        ],
      }));
      setNewFeature({ id: "", title: "", icon: "" });
    }
  };

  // Handle removing a service feature
  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      explore_service_features: prev.explore_service_features.filter(
        (_, i) => i !== index,
      ),
    }));
  };

  // Submit form to create new service
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Basic validation
      if (
        !formData.title ||
        !formData.slug ||
        !formData.description ||
        !formData.icon_name
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (
        !formData.hero_service ||
        !formData.hero_title ||
        !formData.hero_description
      ) {
        throw new Error("Please fill in all required hero section fields");
      }

      // Convert arrays to JSON strings for Supabase JSONB fields
      const serviceData = {
        ...formData,
        hero_bulletpoints:
          formData.hero_bulletpoints.length > 0
            ? formData.hero_bulletpoints
            : null,
        potential_service_cards:
          formData.potential_service_cards.length > 0
            ? formData.potential_service_cards
            : null,
        explore_service_features:
          formData.explore_service_features.length > 0
            ? formData.explore_service_features
            : null,
        explore_service_details:
          Object.keys(formData.explore_service_details).length > 0
            ? formData.explore_service_details
            : null,
      };

      const { data, error } = await createService(serviceData);

      if (error) {
        throw new Error("Failed to create service");
      }

      // Redirect to services admin page on success
      router.push("/admin/dashboard/services");
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the service");
      console.error("Error creating service:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // List of common Lucide icon names for easy selection
  const iconOptions = [
    "",
    "Code",
    "Database",
    "Server",
    "Shield",
    "Smartphone",
    "Laptop",
    "Monitor",
    "Globe",
    "Settings",
    "BarChart",
    "PieChart",
    "Users",
    "Search",
    "Cloud",
    "Lock",
    "Activity",
    "FileText",
    "Terminal",
    "MessageSquare",
    "Mail",
    "Layers",
    "Package",
    "Briefcase",
  ];

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
          <h1 className="text-2xl font-bold">Add New Service</h1>
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
            {/* Form is divided into tabs/sections for better organization */}
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
                <button
                  type="button"
                  onClick={() => setActiveTab("explore")}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "explore" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300"}`}
                >
                  Explore Section
                </button>
              </div>
            </div>
            {/* Basic Info Section */}
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
                  URL-friendly identifier for this service. Auto-generated from
                  title but can be edited.
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
                  <p className="text-xs text-gray-500 mt-1">
                    Name of the Lucide icon to display
                  </p>
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
                  <p className="text-xs text-gray-500 mt-1">
                    Order in which the service appears (lower numbers first)
                  </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Service description that appears on the cards. Keep it
                  concise.
                </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  CSS background color class name (e.g., bg-purple-500,
                  bg-blue-500)
                </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Position for the accent color
                </p>
              </div>

              {/* Image fields section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Image Details
                </h3>

                {/* Image Path */}
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image Path
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/landing/services-1.png"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Path to the image file (e.g., /landing/services-1.png).
                  </p>
                </div>

                {/* Image Position */}
                <div className="mb-4">
                  <label
                    htmlFor="image_position"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image Position
                  </label>
                  <input
                    type="text"
                    id="image_position"
                    name="image_position"
                    value={formData.image_position}
                    onChange={handleChange}
                    placeholder="top-0 right-0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    CSS positioning classes (e.g., top-0 right-0)
                  </p>
                </div>

                {/* Two column layout for dimensions and alt text */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image Width */}
                  <div>
                    <label
                      htmlFor="image_width"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Width
                    </label>
                    <input
                      type="number"
                      id="image_width"
                      name="image_width"
                      value={formData.image_width}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Image Height */}
                  <div>
                    <label
                      htmlFor="image_height"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Height
                    </label>
                    <input
                      type="number"
                      id="image_height"
                      name="image_height"
                      value={formData.image_height}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Image Alt */}
                  <div>
                    <label
                      htmlFor="image_alt"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Alt Text
                    </label>
                    <input
                      type="text"
                      id="image_alt"
                      name="image_alt"
                      value={formData.image_alt}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
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
                <p className="text-xs text-gray-500 mt-1">
                  Main service name displayed in the hero section (e.g., "IT
                  CONSULTING, STRATEGY & SERVICES")
                </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Catchy title displayed in the hero section (e.g., "Redefine
                  Your Business Strategy")
                </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Short description displayed in the hero section
                </p>
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
                <p className="text-xs text-gray-500 mt-1">
                  Key points displayed in the hero section (e.g., "Business
                  strategy, customer experience, and digital transformation.")
                </p>
              </div>

              {/* Hero Image */}
              <div>
                <label
                  htmlFor="hero_image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Hero Image
                </label>
                <input
                  type="text"
                  id="hero_image"
                  name="hero_image"
                  value={formData.hero_image}
                  onChange={handleChange}
                  placeholder="/services/it-cons.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Path to the hero section image (e.g., "/services/it-cons.jpg")
                </p>
              </div>
            </div>

            {/* Potential Section */}
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
                <p className="text-xs text-gray-500 mt-1">
                  Detailed description for the Potential section
                </p>
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

            {/* Explore Section */}
            <div
              className="space-y-6"
              style={{ display: activeTab === "explore" ? "block" : "none" }}
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  Note: The Explore section contains complex nested data. In
                  this initial version, we're focusing on the basic service
                  information. The complete Explore section with service
                  features and details will be implemented in the next phase.
                </p>
              </div>

              {/* Service Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Features
                </label>

                {/* Current service features */}
                {formData.explore_service_features.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {formData.explore_service_features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-50 p-2 rounded"
                      >
                        <span className="font-medium mr-2">
                          {feature.title}
                        </span>
                        <span className="text-xs text-gray-500 mr-2">
                          (ID: {feature.id})
                        </span>
                        <span className="text-xs text-gray-500 flex-1">
                          Icon: {feature.icon}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new service feature */}
                <div className="border border-gray-200 rounded-md p-3 space-y-3">
                  <h4 className="text-sm font-medium">Add Service Feature</h4>

                  {/* Feature ID */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      ID
                    </label>
                    <input
                      type="text"
                      value={newFeature.id}
                      onChange={(e) =>
                        setNewFeature({ ...newFeature, id: e.target.value })
                      }
                      placeholder="consulting"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {/* Feature Title */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newFeature.title}
                      onChange={(e) =>
                        setNewFeature({ ...newFeature, title: e.target.value })
                      }
                      placeholder="IT Consulting"
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  {/* Feature Icon */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Icon
                    </label>
                    <select
                      value={newFeature.icon}
                      onChange={(e) =>
                        setNewFeature({ ...newFeature, icon: e.target.value })
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

                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="flex items-center px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                  >
                    <Plus size={14} className="mr-1" />
                    Add Feature
                  </button>
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Link
                href="/admin/dashboard/services"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-1" />
                    Save Service
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
