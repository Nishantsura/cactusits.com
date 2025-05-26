"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, ArrowLeft, Edit, Trash2, Info } from "lucide-react";
import { getServices, deleteService } from "@/lib/data-utils";

/**
 * Admin page for managing service listings
 * Displays all services with options to add, edit, and delete
 */
export default function ServicesAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const router = useRouter();

  // Check authentication and fetch services on load
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      // Check if authenticated
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

        // Fetch services data
        await fetchServices();
      } catch (error) {
        localStorage.removeItem("adminAuth");
        router.push("/admin");
      }
    };

    checkAuthAndFetchData();
  }, [router]);

  // Fetch services from the database
  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await getServices();

      if (error) {
        throw new Error("Failed to fetch services");
      }

      setServices(data || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching services");
      console.error("Error fetching services:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle service deletion
  const handleDeleteService = async (serviceId: number) => {
    try {
      const { error } = await deleteService(serviceId);

      if (error) {
        throw new Error("Failed to delete service");
      }

      // Remove from local state
      setServices(services.filter((service) => service.id !== serviceId));
      setDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the service");
      console.error("Error deleting service:", err);
    }
  };

  // Format text excerpt for display
  const formatExcerpt = (text: string, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Link
                href="/admin/dashboard"
                className="text-gray-500 hover:text-gray-700 mr-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Services Management</h1>
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow p-6 flex items-center justify-center"
            style={{ minHeight: "300px" }}
          >
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and add new service button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href="/admin/dashboard"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Services Management</h1>
          </div>
          <Link
            href="/admin/dashboard/services/new"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-1" />
            <span>Add New Service</span>
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Services grid */}
        <div className="bg-white rounded-lg shadow p-6">
          {services.length === 0 ? (
            <div className="text-center py-8">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No services found</p>
              <Link
                href="/admin/dashboard/services/new"
                className="text-primary hover:text-primary/90 font-medium"
              >
                Add your first service
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  {/* Service card header */}
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-lg">{service.title}</h3>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/dashboard/services/edit/${service.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Service card content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="text-gray-500 text-sm">Slug:</span>
                      <span className="text-gray-700 ml-2 text-sm font-mono">
                        {service.slug}
                      </span>
                    </div>

                    {/* Description field - showing short_description if exists, fallback to description */}
                    <div className="mb-3">
                      <span className="text-gray-500 text-sm">
                        Description:
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        {formatExcerpt(
                          service.short_description || service.description,
                          120,
                        )}
                      </p>
                    </div>

                    {/* Icon display */}
                    {service.icon_name && (
                      <div className="mb-3">
                        <span className="text-gray-500 text-sm">Icon:</span>
                        <span className="text-gray-700 ml-2 text-sm font-mono">
                          {service.icon_name}
                        </span>
                      </div>
                    )}

                    {/* Hero section info */}
                    {service.hero_title && (
                      <div className="mb-3">
                        <span className="text-gray-500 text-sm">
                          Hero Title:
                        </span>
                        <p className="text-gray-700 text-sm mt-1">
                          {formatExcerpt(service.hero_title, 80)}
                        </p>
                      </div>
                    )}

                    {/* Images section */}
                    {service.image && (
                      <div className="mb-3">
                        <span className="text-gray-500 text-sm">
                          Has Image:
                        </span>
                        <span className="text-gray-700 ml-2 text-sm">Yes</span>
                      </div>
                    )}

                    {/* Advanced sections presence indicators */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {/* Safely parse JSON fields and check for content */}
                      {(() => {
                        try {
                          const bulletpoints = service.hero_bulletpoints
                            ? typeof service.hero_bulletpoints === "string"
                              ? JSON.parse(service.hero_bulletpoints)
                              : service.hero_bulletpoints
                            : [];
                          return bulletpoints &&
                            Array.isArray(bulletpoints) &&
                            bulletpoints.length > 0 ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Hero Content
                            </span>
                          ) : null;
                        } catch (e) {
                          return null;
                        }
                      })()}

                      {/* Check for potential section content */}
                      {service.potential_description && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Potential Section
                        </span>
                      )}

                      {/* Check for explore section content */}
                      {service.hero_description && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Explore Section
                        </span>
                      )}
                    </div>

                    {/* Status and order indicators */}
                    <div className="flex justify-between text-gray-500 text-xs mt-4">
                      <span>Order: {service.order_index || "Not set"}</span>
                      <span
                        className={
                          service.is_active ? "text-green-600" : "text-red-600"
                        }
                      >
                        {service.is_active !== false ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Delete confirmation */}
                  {deleteConfirm === service.id && (
                    <div className="p-4 bg-red-50 border-t border-red-100">
                      <p className="text-red-700 text-sm mb-3">
                        Are you sure you want to delete this service? This
                        cannot be undone.
                      </p>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
