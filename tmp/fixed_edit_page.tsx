"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash, Edit2 } from "lucide-react";
import { getServiceById, updateService } from "@/lib/data-utils";

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

  // Explore section
  explore_service_features: ServiceFeatureType[];
  explore_service_details: Record<string, ServiceDetailType>;
}

export default function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "basic" | "hero" | "potential" | "explore"
  >("basic");
  const serviceId = parseInt(params.id);

  // States for adding new items
  const [newBulletpoint, setNewBulletpoint] = useState("");
  const [newCard, setNewCard] = useState<ServiceCardType>({
    title: "",
    description: "",
    icon: "",
  });
  const [newFeature, setNewFeature] = useState<ServiceFeatureType>({
    id: "",
    title: "",
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

    // Explore section
    explore_service_features: [],
    explore_service_details: {},
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
          is_active: data.is_active !== false,

          // Hero section
          hero_service: data.hero_service || "",
          hero_title: data.hero_title || "",
          hero_description: data.hero_description || "",
          hero_bulletpoints: data.hero_bulletpoints
            ? typeof data.hero_bulletpoints === "string"
              ? JSON.parse(data.hero_bulletpoints)
              : data.hero_bulletpoints
            : [],
          hero_image: data.hero_image || "",

          // Potential section
          potential_description: data.potential_description || "",
          potential_service_cards: data.potential_service_cards
            ? typeof data.potential_service_cards === "string"
              ? JSON.parse(data.potential_service_cards)
              : data.potential_service_cards
            : [],

          // Explore section
          explore_service_features: data.explore_service_features
            ? typeof data.explore_service_features === "string"
              ? JSON.parse(data.explore_service_features)
              : data.explore_service_features
            : [],
          explore_service_details: data.explore_service_details
            ? typeof data.explore_service_details === "string"
              ? JSON.parse(data.explore_service_details)
              : data.explore_service_details
            : {},
        });

        setError(null);
      } catch (err: any) {
        console.error("Error loading service:", err);
        setError(err.message || "Failed to load service");
      } finally {
        setIsFetching(false);
      }
    };

    fetchServiceData();
  }, [serviceId, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

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

  // Handle adding a bulletpoint
  const handleAddBulletpoint = () => {
    if (!newBulletpoint.trim()) return;

    setFormData((prev) => ({
      ...prev,
      hero_bulletpoints: [...prev.hero_bulletpoints, newBulletpoint.trim()],
    }));
    setNewBulletpoint("");
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

  // Handle adding a feature
  const handleAddFeature = () => {
    if (!newFeature.id.trim() || !newFeature.title.trim()) return;

    setFormData((prev) => ({
      ...prev,
      explore_service_features: [
        ...prev.explore_service_features,
        { ...newFeature },
      ],
    }));
    setNewFeature({ id: "", title: "", icon: "" });
  };

  // Handle removing a feature
  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      explore_service_features: prev.explore_service_features.filter(
        (_, i) => i !== index,
      ),
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

          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
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
          <h1 className="text-2xl font-bold">Edit Service</h1>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Service form */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Tab navigation for form sections */}
          <div className="border-b">
            <nav className="flex">
              {(["basic", "hero", "potential", "explore"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 font-medium text-sm border-b-2 ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ),
              )}
            </nav>
          </div>

          {/* Form sections */}
          <div className="p-6">
            {/* Basic info form */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Slug
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
                </div>

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
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="icon_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Icon
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="is_active"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Status
                    </label>
                    <select
                      id="is_active"
                      name="is_active"
                      value={formData.is_active.toString()}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}

            {/* Hero section form */}
            {activeTab === "hero" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Hero Section</h2>

                <div>
                  <label
                    htmlFor="hero_service"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Service Name
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

                <div>
                  <label
                    htmlFor="hero_title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
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

                <div>
                  <label
                    htmlFor="hero_description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="hero_description"
                    name="hero_description"
                    value={formData.hero_description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bullet Points
                  </label>
                  <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                    <div className="space-y-3 mb-4">
                      {formData.hero_bulletpoints.map((point, index) => (
                        <div key={index} className="flex items-center">
                          <span className="flex-grow">{point}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBulletpoint(index)}
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex">
                      <input
                        type="text"
                        value={newBulletpoint}
                        onChange={(e) => setNewBulletpoint(e.target.value)}
                        placeholder="Add a new bullet point"
                        className="flex-grow p-2 border border-gray-300 rounded-l-md"
                      />
                      <button
                        type="button"
                        onClick={handleAddBulletpoint}
                        className="px-3 py-2 bg-gray-200 text-gray-800 rounded-r-md hover:bg-gray-300 flex-shrink-0"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hero_image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    id="hero_image"
                    name="hero_image"
                    value={formData.hero_image}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}

            {/* Potential section form */}
            {activeTab === "potential" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Potential Section</h2>

                <div>
                  <label
                    htmlFor="potential_description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="potential_description"
                    name="potential_description"
                    value={formData.potential_description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Cards
                  </label>
                  <div className="space-y-4">
                    {/* Display existing cards */}
                    {formData.potential_service_cards.map((card, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 rounded-md p-4 relative"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveCard(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                        <div className="font-medium">{card.title}</div>
                        <div className="text-sm text-gray-600 mt-2">
                          {card.description}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Icon: {card.icon}
                        </div>
                      </div>
                    ))}

                    {/* Add new card */}
                    <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                      <h4 className="font-medium mb-3">Add New Card</h4>
                      <div className="grid gap-3">
                        <div>
                          <label
                            htmlFor="newCardTitle"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            id="newCardTitle"
                            value={newCard.title}
                            onChange={(e) =>
                              setNewCard({ ...newCard, title: e.target.value })
                            }
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="newCardDescription"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Description
                          </label>
                          <textarea
                            id="newCardDescription"
                            value={newCard.description}
                            onChange={(e) =>
                              setNewCard({
                                ...newCard,
                                description: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full p-2 border border-gray-300 rounded-md"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="newCardIcon"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Icon
                          </label>
                          <select
                            id="newCardIcon"
                            value={newCard.icon}
                            onChange={(e) =>
                              setNewCard({ ...newCard, icon: e.target.value })
                            }
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

                        <button
                          type="button"
                          onClick={handleAddCard}
                          className="w-full p-2 mt-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Explore section form */}
            {activeTab === "explore" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Explore Section</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Features
                  </label>
                  <div className="space-y-4">
                    {/* Display existing features */}
                    {formData.explore_service_features.map((feature, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 rounded-md p-4 relative"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {feature.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          Icon: {feature.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add new feature */}
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Add New Feature</h4>
                  <div className="grid gap-3">
                    <div>
                      <label
                        htmlFor="newFeatureId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        ID
                      </label>
                      <input
                        type="text"
                        id="newFeatureId"
                        value={newFeature.id}
                        onChange={(e) =>
                          setNewFeature({ ...newFeature, id: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newFeatureTitle"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="newFeatureTitle"
                        value={newFeature.title}
                        onChange={(e) =>
                          setNewFeature({
                            ...newFeature,
                            title: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newFeatureIcon"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Icon
                      </label>
                      <select
                        id="newFeatureIcon"
                        value={newFeature.icon}
                        onChange={(e) =>
                          setNewFeature({ ...newFeature, icon: e.target.value })
                        }
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

                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="w-full p-2 mt-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Feature
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form actions */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <Link
              href="/admin/dashboard/services"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
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
        </div>
      </div>
    </div>
  );
}
