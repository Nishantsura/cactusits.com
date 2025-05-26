"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircle, ArrowLeft, Edit, Trash2, Info } from "lucide-react";
import { getIndustries, deleteIndustry } from "@/lib/data-utils";

/**
 * Admin page for managing industry listings
 * Displays all industries with options to add, edit, and delete
 */
export default function IndustriesAdmin() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const router = useRouter();

  // Check authentication and fetch industries on load
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

        // Fetch industries data
        await fetchIndustries();
      } catch (error) {
        localStorage.removeItem("adminAuth");
        router.push("/admin");
      }
    };

    checkAuthAndFetchData();
  }, [router]);

  // Fetch industries from the database
  const fetchIndustries = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await getIndustries();

      if (error) {
        throw new Error("Failed to fetch industries");
      }

      setIndustries(data || []);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching industries");
      console.error("Error fetching industries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle industry deletion
  const handleDeleteIndustry = async (industryId: number) => {
    try {
      const { error } = await deleteIndustry(industryId);

      if (error) {
        throw new Error("Failed to delete industry");
      }

      // Remove from local state
      setIndustries(
        industries.filter((industry) => industry.id !== industryId),
      );
      setDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the industry");
      console.error("Error deleting industry:", err);
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
              <h1 className="text-2xl font-bold">Industries Management</h1>
            </div>
          </div>
          <div
            className="bg-white rounded-lg shadow p-6 flex items-center justify-center"
            style={{ minHeight: "300px" }}
          >
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading industries...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and add new industry button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href="/admin/dashboard"
              className="text-gray-500 hover:text-gray-700 mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Industries Management</h1>
          </div>
          <Link
            href="/admin/dashboard/industries/new"
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            <PlusCircle className="w-5 h-5 mr-1" />
            Add Industry
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Industries grid */}
        <div className="bg-white rounded-lg shadow">
          {industries.length === 0 ? (
            <div className="text-center py-8">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No industries found</p>
              <Link
                href="/admin/dashboard/industries/new"
                className="text-primary hover:text-primary/90 font-medium"
              >
                Add your first industry
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {industries.map((industry) => (
                <div
                  key={industry.id}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  {/* Industry card header */}
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-lg">
                      {industry.name || industry.hero_industry}
                    </h3>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/dashboard/industries/edit/${industry.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(industry.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Industry card content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="text-gray-500 text-sm">Slug:</span>
                      <span className="text-gray-700 ml-2 text-sm font-mono">
                        {industry.slug}
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="text-gray-500 text-sm">
                        Description:
                      </span>
                      <p className="text-gray-700 text-sm mt-1">
                        {formatExcerpt(
                          industry.description || industry.hero_description,
                          120,
                        )}
                      </p>
                    </div>
                    {industry.order_index !== undefined && (
                      <div className="text-gray-500 text-xs mt-4">
                        Order: {industry.order_index || "Not set"}
                      </div>
                    )}
                  </div>

                  {/* Delete confirmation */}
                  {deleteConfirm === industry.id && (
                    <div className="p-4 bg-red-50 border-t border-red-100">
                      <p className="text-red-700 text-sm mb-3">
                        Are you sure you want to delete this industry? This
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
                          onClick={() => handleDeleteIndustry(industry.id)}
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
