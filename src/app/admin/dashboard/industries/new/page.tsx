"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X, Save } from "lucide-react";
import { createIndustry } from "@/lib/data-utils";

// Component for creating a new industry
export default function NewIndustry() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    // Basic info
    name: "",
    slug: "",
    description: "",
    order_index: 0,
    is_active: true,

    // Hero section
    hero_industry: "",
    hero_title: "",
    hero_description: "",

    // Approach section (JSON)
    approach_items: [],
  });

  // Approach items state
  const [approachItems, setApproachItems] = useState<
    { title: string; description: string }[]
  >([]);

  // Authentication check
  useEffect(() => {
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
      }
    } catch (error) {
      localStorage.removeItem("adminAuth");
      router.push("/admin");
    }
  }, [router]);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
    }));
  };

  // Handle number input change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  // Handle approach item changes
  const handleApproachItemChange = (
    index: number,
    field: "title" | "description",
    value: string,
  ) => {
    const updatedItems = [...approachItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setApproachItems(updatedItems);
  };

  // Add new approach item
  const addApproachItem = () => {
    setApproachItems([...approachItems, { title: "", description: "" }]);
  };

  // Remove approach item
  const removeApproachItem = (index: number) => {
    setApproachItems(approachItems.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.slug ||
        !formData.hero_industry ||
        !formData.hero_title ||
        !formData.hero_description
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare final data with JSON fields
      const finalData = {
        ...formData,
        approach_items: approachItems.length > 0 ? approachItems : null,
      };

      // Send to API
      const { data, error } = await createIndustry(finalData);

      if (error) {
        const errorMessage =
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : "Failed to create industry";
        throw new Error(errorMessage);
      }

      // Redirect on success
      router.push("/admin/dashboard/industries");
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the industry");
      console.error("Error creating industry:", err);

      // Scroll to error message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tab content components
  const basicInfoTab = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            The display name for this industry
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            URL-friendly version (e.g., "information-technology")
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        ></textarea>
        <p className="mt-1 text-sm text-gray-500">
          Brief description for admin listing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order Index
          </label>
          <input
            type="number"
            name="order_index"
            value={formData.order_index}
            onChange={handleNumberChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <p className="mt-1 text-sm text-gray-500">
            For custom ordering (lower numbers appear first)
          </p>
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">
            Active (visible on site)
          </span>
        </label>
      </div>
    </div>
  );

  const heroSectionTab = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry Display Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hero_industry"
            value={formData.hero_industry}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Display name for hero section (e.g., "Information Technology")
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hero Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="hero_title"
          value={formData.hero_title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Main title in the hero section
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hero Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="hero_description"
          value={formData.hero_description}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          required
        ></textarea>
        <p className="mt-1 text-sm text-gray-500">
          Detailed description for the hero section
        </p>
      </div>
    </div>
  );

  const approachSectionTab = (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Approach Items</h3>
        <button
          type="button"
          onClick={addApproachItem}
          className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Item
        </button>
      </div>

      {/* Approach items list */}
      <div className="space-y-4">
        {approachItems.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <p className="text-gray-500">No approach items added yet.</p>
            <button
              type="button"
              onClick={addApproachItem}
              className="mt-2 text-primary hover:text-primary/80 text-sm font-medium"
            >
              Add your first approach item
            </button>
          </div>
        ) : (
          approachItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-4 bg-white"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  Item #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeApproachItem(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleApproachItemChange(index, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      handleApproachItemChange(
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  ></textarea>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Get active tab content
  const getTabContent = () => {
    switch (activeTab) {
      case "basic":
        return basicInfoTab;
      case "hero":
        return heroSectionTab;
      case "approach":
        return approachSectionTab;
      default:
        return basicInfoTab;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href="/admin/dashboard/industries"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Create New Industry</h1>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form with tabs */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  type="button"
                  onClick={() => setActiveTab("basic")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "basic"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("hero")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "hero"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Hero Section
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("approach")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "approach"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Approach Section
                </button>
              </nav>
            </div>

            {/* Tab content */}
            <div className="p-6">{getTabContent()}</div>

            {/* Form actions */}
            <div className="bg-gray-50 px-6 py-3 flex justify-end rounded-b-lg border-t border-gray-100">
              <Link
                href="/admin/dashboard/industries"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Save Industry
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
