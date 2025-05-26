"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Simple password-protected admin login page
 * This provides basic access control without complex authentication
 */
export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [adminPassword, setAdminPassword] = useState("cactus123"); // Default password
  const router = useRouter();

  // This loads the admin password from environment variable if available
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
      if (envPassword) {
        setAdminPassword(envPassword);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple password check
    if (password === adminPassword) {
      // Save a session token in localStorage with expiration
      const expiry = new Date();
      expiry.setHours(expiry.getHours() + 2); // 2 hour expiration

      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          authenticated: true,
          expires: expiry.toISOString(),
        }),
      );

      router.push("/admin/dashboard");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Cactus Admin</h1>
          <p className="text-gray-600 mt-2">
            Enter your password to access the admin dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md transition duration-200 font-medium"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
