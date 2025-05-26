"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Briefcase, 
  Building2, 
  MessageSquare, 
  Quote, 
  LayoutGrid, 
  Home,
  LogOut 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

/**
 * Admin dashboard with simple content management sections
 * No complex login system as per requirements
 */
export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    jobs: 0,
    services: 0,
    industries: 0,
    testimonials: 0,
    contacts: 0
  });
  const router = useRouter();
  
  // Check if user is authenticated via localStorage
  // Fetch counts from the database
  const fetchCounts = async () => {
    try {
      // Fetch job count
      const { count: jobCount } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      
      // Fetch services count
      const { count: servicesCount } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });
        
      // Fetch industries count
      const { count: industriesCount } = await supabase
        .from('industries')
        .select('*', { count: 'exact', head: true });
      
      // Fetch testimonials count
      const { count: testimonialsCount } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true });
      
      // Fetch contact submissions count
      const { count: contactsCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });
      
      setStats({
        jobs: jobCount || 0,
        services: servicesCount || 0,
        industries: industriesCount || 0,
        testimonials: testimonialsCount || 0,
        contacts: contactsCount || 0
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('adminAuth');
      
      if (!authData) {
        router.push('/admin');
        return;
      }
      
      try {
        const { authenticated, expires } = JSON.parse(authData);
        
        if (!authenticated || new Date(expires) < new Date()) {
          // Session expired
          localStorage.removeItem('adminAuth');
          router.push('/admin');
          return;
        }
        
        setIsAuthenticated(true);
        // Fetch counts after authentication
        fetchCounts();
      } catch (error) {
        localStorage.removeItem('adminAuth');
        router.push('/admin');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };
  
  // If still checking authentication, show loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated (should be handled by useEffect redirect, but just in case)
  if (!isAuthenticated) {
    return null;
  }
  
  // Admin section cards with their respective icons and descriptions
  const adminSections = [
    {
      title: 'Jobs',
      description: 'Manage job listings that appear on the careers page',
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      link: '/admin/dashboard/jobs',
      count: `${stats.jobs} active`
    },
    {
      title: 'Services',
      description: 'Edit service details and information',
      icon: <LayoutGrid className="w-8 h-8 text-purple-500" />,
      link: '/admin/dashboard/services',
      count: `${stats.services} services`
    },
    {
      title: 'Industries',
      description: 'Manage industry pages and content',
      icon: <Building2 className="w-8 h-8 text-green-500" />,
      link: '/admin/dashboard/industries',
      count: `${stats.industries} industries`
    },
    {
      title: 'Testimonials',
      description: 'Add or edit client and employee testimonials',
      icon: <Quote className="w-8 h-8 text-yellow-500" />,
      link: '/admin/dashboard/testimonials',
      count: `${stats.testimonials} testimonials`
    },
    {
      title: 'Contact Submissions',
      description: 'View messages from the contact form',
      icon: <MessageSquare className="w-8 h-8 text-red-500" />,
      link: '/admin/dashboard/contacts',
      count: `${stats.contacts} messages`
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Cactus Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
              <Home className="w-5 h-5 mr-1" />
              <span>View Site</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to your admin panel</h2>
          <p className="text-gray-600">
            Manage your website content from this dashboard. Select a section below to get started.
          </p>
        </div>
        
        {/* Admin sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <Link 
              href={section.link} 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <div className="bg-gray-50 rounded-lg p-3 mr-4">{section.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{section.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{section.description}</p>
                  <div className="text-primary text-sm font-medium">{section.count}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
