"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, ArrowLeft, ChevronDown, ChevronUp, Edit, Trash2, ExternalLink } from 'lucide-react';
import { getJobs, deleteJob } from '@/lib/data-utils';

/**
 * Admin page for managing job listings
 * Displays all jobs with options to add, edit, and delete
 */
export default function JobsAdmin() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const router = useRouter();
  
  // Check authentication and fetch jobs on load
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      // Check if authenticated
      const authData = localStorage.getItem('adminAuth');
      if (!authData) {
        router.push('/admin');
        return;
      }
      
      try {
        const { authenticated, expires } = JSON.parse(authData);
        if (!authenticated || new Date(expires) < new Date()) {
          localStorage.removeItem('adminAuth');
          router.push('/admin');
          return;
        }
        
        // Fetch jobs data
        await fetchJobs();
      } catch (error) {
        localStorage.removeItem('adminAuth');
        router.push('/admin');
      }
    };
    
    checkAuthAndFetchData();
  }, [router]);
  
  // Fetch jobs from the database
  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await getJobs();
      
      if (error) {
        throw new Error('Failed to fetch jobs');
      }
      
      setJobs(data || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle job details expansion
  const toggleJobExpand = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Handle job deletion
  const handleDeleteJob = async (jobId: number) => {
    try {
      const { error } = await deleteJob(jobId);
      
      if (error) {
        throw new Error('Failed to delete job');
      }
      
      // Remove from local state
      setJobs(jobs.filter(job => job.id !== jobId));
      setDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the job');
      console.error('Error deleting job:', err);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Jobs Management</h1>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center" style={{ minHeight: '300px' }}>
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and add new job button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Jobs Management</h1>
          </div>
          <Link 
            href="/admin/dashboard/jobs/new" 
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-1" />
            <span>Add New Job</span>
          </Link>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Jobs list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {jobs.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">No jobs found</p>
              <Link 
                href="/admin/dashboard/jobs/new" 
                className="text-primary hover:text-primary/90 font-medium"
              >
                Add your first job listing
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Posted
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <React.Fragment key={job.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <button 
                            onClick={() => toggleJobExpand(job.id)}
                            className="flex items-center focus:outline-none text-left"
                          >
                            {expandedJobId === job.id ? 
                              <ChevronUp className="w-4 h-4 mr-2 text-gray-400" /> : 
                              <ChevronDown className="w-4 h-4 mr-2 text-gray-400" />
                            }
                            <span>{job.title}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.type === 'Full-Time' ? 'bg-green-100 text-green-800' : 
                            job.type === 'Part-Time' ? 'bg-blue-100 text-blue-800' : 
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {job.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(job.posted_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-3">
                            <Link
                              href={`/admin/dashboard/jobs/edit/${job.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(job.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            {job.apply_link && (
                              <a
                                href={job.apply_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-gray-700"
                              >
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded row with job details */}
                      {expandedJobId === job.id && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 bg-gray-50">
                            <div className="mb-2">
                              <span className="font-medium">Salary:</span> {job.salary}
                            </div>
                            <div className="mb-2">
                              <span className="font-medium">Category:</span> {job.category}
                            </div>
                            <div>
                              <span className="font-medium">Description:</span>
                              <div className="mt-1 whitespace-pre-line">{job.description?.substring(0, 300)}...</div>
                            </div>
                          </td>
                        </tr>
                      )}
                      
                      {/* Delete confirmation */}
                      {deleteConfirm === job.id && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 bg-red-50">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-red-700">
                                Are you sure you want to delete this job? This cannot be undone.
                              </p>
                              <div className="flex space-x-3">
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
