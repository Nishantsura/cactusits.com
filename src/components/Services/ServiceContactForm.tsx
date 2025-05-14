"use client";
import { useState, type FormEvent, useRef } from "react";
import { Send } from "lucide-react";

export default function ServiceContactForm({
  serviceTitle = "our service",
}: {
  serviceTitle?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="bg-warm-white p-8 rounded-xl shadow-lg border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            How can we help you with {serviceTitle}?
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your project or requirements..."
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Your data is secure with us. We never share your information with third parties.</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 px-6 rounded-lg transition-all font-medium text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 border border-transparent hover:bg-gradient-to-r hover:from-primary/90 hover:to-purple-500 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <>
              <span className="animate-pulse">Sending...</span>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </>
          ) : (
            <>
              Get In Touch
              <Send size={18} className="ml-1" />
            </>
          )}
        </button>
              
        {showSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 flex-shrink-0 mt-0.5">
              <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Thank you for your message! We'll get back to you as soon as possible.</span>
          </div>
        )}
      </form>
    </div>
  );
}
