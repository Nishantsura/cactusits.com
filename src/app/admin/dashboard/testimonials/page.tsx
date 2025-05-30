"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Trash, Edit, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Define the testimonial type
type Testimonial = {
  id: number;
  text: string;
  name: string;
  role: string;
  company?: string;
  service?: string;
  created_at?: string;
};

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] =
    useState<Testimonial | null>(null);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  // Form fields state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [text, setText] = useState("");

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Make sure we're in a browser environment
        if (typeof window === "undefined") {
          setIsLoading(false);
          return;
        }

        const authData = localStorage.getItem("adminAuth");

        if (!authData) {
          router.push("/admin");
          return;
        }

        try {
          const { authenticated, expires } = JSON.parse(authData);

          if (!authenticated || new Date(expires) < new Date()) {
            // Session expired
            localStorage.removeItem("adminAuth");
            router.push("/admin");
            return;
          }

          setIsAuthenticated(true);
          fetchTestimonials();
        } catch (error) {
          console.error("Error parsing auth data:", error);
          localStorage.removeItem("adminAuth");
          router.push("/admin");
        }
      } catch (e) {
        console.error("Unexpected error in auth check:", e);
        setIsLoading(false);
        router.push("/admin");
      }
    };

    checkAuth();
  }, [router]);

  // Fetch testimonials from Supabase
  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);

      // Check if Supabase client is properly initialized
      if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.warn("Supabase client not properly initialized");
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching testimonials:", error);
      } else {
        setTestimonials(data || []);
      }
    } catch (error) {
      console.error("Error in fetchTestimonials:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle adding a new testimonial
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Basic validation
    if (!name || !role || !text) {
      setFormError(
        "Please fill in all required fields (name, role, and testimonial text)",
      );
      return;
    }

    try {
      setIsLoading(true);

      const newTestimonial = {
        name,
        role,
        company: company || null,
        service: service || null,
        text,
      };

      // Add new testimonial to Supabase
      const { error } = await supabase
        .from("testimonials")
        .insert([newTestimonial]);

      if (error) {
        console.error("Error adding testimonial:", error);
        setFormError("Failed to add testimonial. Please try again.");
      } else {
        // Reset form and refetch testimonials
        resetForm();
        fetchTestimonials();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error in handleAddTestimonial:", error);
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating a testimonial
  const handleUpdateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!currentTestimonial?.id) {
      setFormError("No testimonial selected for update");
      return;
    }

    // Basic validation
    if (!name || !role || !text) {
      setFormError(
        "Please fill in all required fields (name, role, and testimonial text)",
      );
      return;
    }

    try {
      setIsLoading(true);

      const updatedTestimonial = {
        name,
        role,
        company: company || null,
        service: service || null,
        text,
      };

      // Update testimonial in Supabase
      const { error } = await supabase
        .from("testimonials")
        .update(updatedTestimonial)
        .eq("id", currentTestimonial.id);

      if (error) {
        console.error("Error updating testimonial:", error);
        setFormError("Failed to update testimonial. Please try again.");
      } else {
        // Reset form and refetch testimonials
        resetForm();
        fetchTestimonials();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error in handleUpdateTestimonial:", error);
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a testimonial
  const handleDeleteTestimonial = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this testimonial? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      setIsLoading(true);

      // Delete testimonial from Supabase
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting testimonial:", error);
        alert("Failed to delete testimonial. Please try again.");
      } else {
        // Refetch testimonials
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error in handleDeleteTestimonial:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Set up the form for editing a testimonial
  const handleEditClick = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setName(testimonial.name);
    setRole(testimonial.role);
    setCompany(testimonial.company || "");
    setService(testimonial.service || "");
    setText(testimonial.text);
    setIsEditing(true);
  };

  // Reset the form
  const resetForm = () => {
    setName("");
    setRole("");
    setCompany("");
    setService("");
    setText("");
    setCurrentTestimonial(null);
    setFormError("");
  };

  // If still checking authentication, show loading
  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with back button */}
      <header className="bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              href="/admin/dashboard"
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">Manage Testimonials</h1>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsEditing(true);
            }}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Testimonial
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form for adding/editing */}
        {isEditing && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {currentTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
                {formError}
              </div>
            )}

            <form
              onSubmit={
                currentTestimonial
                  ? handleUpdateTestimonial
                  : handleAddTestimonial
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role/Position *
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Area (Optional)
                  </label>
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Text *
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {currentTestimonial ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List of existing testimonials */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Testimonials</h2>
          </div>

          {isLoading ? (
            <div className="p-6 text-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-500">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">
                No testimonials found. Add your first testimonial!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                          {testimonial.company
                            ? `, ${testimonial.company}`
                            : ""}
                        </p>
                        {testimonial.service && (
                          <p className="text-xs text-primary mt-1">
                            {testimonial.service}
                          </p>
                        )}
                        <p className="mt-2 text-gray-700">{testimonial.text}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(testimonial)}
                        className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full"
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full"
                        title="Delete"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
