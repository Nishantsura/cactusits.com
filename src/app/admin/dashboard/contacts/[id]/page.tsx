"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Mail, Phone, ExternalLink, User, Building, Tag, Clock, FileText } from 'lucide-react';
import { getContactSubmissionById, updateContactSubmission } from '@/lib/data-utils';

// Define an interface for Supabase-like errors
interface SupabaseError {
  message: string;
  // You can add other common error properties here if needed, e.g., code, details
}

// Type guard to check if an error object matches the SupabaseError interface
function isSupabaseError(error: any): error is SupabaseError {
  return error && typeof error === 'object' && typeof error.message === 'string';
}

/**
 * Admin page for viewing and managing a specific contact submission
 * Shows all submission details and allows updating status and adding notes
 */
export default function ContactDetail() {
  const router = useRouter();
  const pageParams = useParams();
  // Ensure id is a string. useParams might return string | string[] or undefined during initial render.
  const idFromParams = pageParams.id;
  const id = Array.isArray(idFromParams) ? idFromParams[0] : idFromParams as string;

  const [submission, setSubmission] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [status, setStatus] = useState('new');
  const [notes, setNotes] = useState('');
  
  // Fetch submission details from the database
  const fetchSubmission = useCallback(async () => {
    if (!id) { // Guard clause if id is not yet available
      //setError("Submission ID is missing for fetching."); // Optional: set an error or handle appropriately
      setIsLoading(false); // Ensure loading state is reset
      return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      const submissionId = parseInt(id); // Use id from useParams
      const { data, error: fetchError } = await getContactSubmissionById(submissionId);
      
      if (fetchError) {
        const errorMessage = isSupabaseError(fetchError) ? fetchError.message : 'Unknown error';
        throw new Error('Failed to fetch contact submission: ' + errorMessage);
      }
      
      if (!data) {
        throw new Error('Contact submission not found');
      }
      
      setSubmission(data);
      setStatus(data.status || 'new');
      setNotes(data.notes || '');
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the contact submission');
      console.error('Error fetching contact submission:', err);
    } finally {
      setIsLoading(false);
    }
  }, [id, setIsLoading, setError, setSubmission, setStatus, setNotes]); // Added dependencies for useCallback
  
  // Check authentication and fetch submission data on load
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
        
        // Fetch submission data
        // fetchSubmission itself now checks for id internally and is memoized
        await fetchSubmission(); 
      } catch (error) {
        localStorage.removeItem('adminAuth');
        router.push('/admin');
      }
    };
    
    // Only run if id is available from useParams and fetchSubmission is memoized
    if (id) { 
        checkAuthAndFetchData();
    }
  }, [id, router, fetchSubmission]); // Updated dependencies
  
  // Handle form submission to update status and notes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (!id) { // Guard clause if id is not available
        setError("Submission ID is missing. Cannot save.");
        setIsSaving(false);
        return;
      }
      const submissionId = parseInt(id); // Use id from useParams
      const updateData = {
        status,
        notes
      };
      
      // Rename error to avoid conflict with state variable
      const { error: updateError } = await updateContactSubmission(submissionId, updateData); 
      
      if (updateError) {
        const errorMessage = isSupabaseError(updateError) ? updateError.message : 'Unknown error';
        throw new Error('Failed to update contact submission: ' + errorMessage);
      }
      
      setSuccess('Contact submission updated successfully');
      
      // Update local state to reflect changes
      setSubmission((prevSubmission: any) => ({ // Ensure we use the previous state correctly
        ...prevSubmission,
        ...updateData
      }));
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the contact submission');
      console.error('Error updating contact submission:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };
  
  // Format array (JSON) data for display
  const formatArrayData = (data: any) => {
    if (!data) return '';
    try {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if (Array.isArray(data)) {
        return data.join(', ');
      }
      return JSON.stringify(data);
    } catch (e) {
      return String(data);
    }
  };
  
  // Get user type display
  const getUserTypeDisplay = (userType: string) => {
    switch (userType) {
      case 'hiringManager':
        return 'Hiring Manager';
      case 'jobSeeker':
        return 'Job Seeker';
      default:
        return userType;
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'new':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Link href="/admin/dashboard/contacts" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Contact Details</h1>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center" style={{ minHeight: '300px' }}>
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading submission details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Link href="/admin/dashboard/contacts" className="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold">Contact Details</h1>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Submission not found</p>
              <Link href="/admin/dashboard/contacts" className="text-primary hover:underline">
                Back to submissions list
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard/contacts" className="text-gray-500 hover:text-gray-700 mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Contact Details</h1>
          </div>
        </div>
        
        {/* Success message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - submission details */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium">Submission Details</h2>
              </div>
              
              <div className="p-6">
                {/* Contact details */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Name</div>
                          <div className="mt-1 flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <div className="text-base">{submission.name}</div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Email</div>
                          <div className="mt-1 flex items-center">
                            <Mail className="h-5 w-5 text-gray-400 mr-2" />
                            <a href={`mailto:${submission.email}`} className="text-base text-blue-600 hover:text-blue-800">
                              {submission.email}
                            </a>
                          </div>
                        </div>
                        
                        {submission.phone && (
                          <div>
                            <div className="text-sm font-medium text-gray-500">Phone</div>
                            <div className="mt-1 flex items-center">
                              <Phone className="h-5 w-5 text-gray-400 mr-2" />
                              <a href={`tel:${submission.phone}`} className="text-base text-blue-600 hover:text-blue-800">
                                {submission.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">User Type</div>
                          <div className="mt-1 flex items-center">
                            <div className={`px-2 py-1 text-xs font-medium rounded ${
                              submission.user_type === 'hiringManager' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {getUserTypeDisplay(submission.user_type)}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Status</div>
                          <div className="mt-1 flex items-center">
                            <div className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                              {submission.status || 'new'}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium text-gray-500">Date Submitted</div>
                          <div className="mt-1 flex items-center">
                            <Clock className="h-5 w-5 text-gray-400 mr-2" />
                            <div className="text-base">{formatDate(submission.created_at)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {submission.user_type === 'hiringManager' ? 'Organization Details' : 'Job Seeker Details'}
                      </h2>
                      
                      {submission.user_type === 'hiringManager' ? (
                        <div className="space-y-3">
                          {submission.organization && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Organization</div>
                              <div className="mt-1 flex items-center">
                                <Building className="h-5 w-5 text-gray-400 mr-2" />
                                <div className="text-base">{submission.organization}</div>
                              </div>
                            </div>
                          )}
                          
                          {submission.website && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Website</div>
                              <div className="mt-1 flex items-center">
                                <ExternalLink className="h-5 w-5 text-gray-400 mr-2" />
                                <a 
                                  href={submission.website.startsWith('http') ? submission.website : `https://${submission.website}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-base text-blue-600 hover:text-blue-800"
                                >
                                  {submission.website}
                                </a>
                              </div>
                            </div>
                          )}
                          
                          {submission.hiring_positions && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Positions</div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {Array.isArray(submission.hiring_positions) 
                                  ? submission.hiring_positions.map((position: string, index: number) => (
                                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center">
                                        <Tag className="h-3 w-3 mr-1 text-gray-500" />
                                        {position}
                                      </span>
                                    ))
                                  : formatArrayData(submission.hiring_positions).split(', ').map((position: string, index: number) => (
                                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded flex items-center">
                                        <Tag className="h-3 w-3 mr-1 text-gray-500" />
                                        {position}
                                      </span>
                                    ))
                                }
                              </div>
                            </div>
                          )}
                          
                          {submission.hiring_type && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Hiring Type</div>
                              <div className="mt-1">
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                  submission.hiring_type === 'contractor' ? 'bg-orange-100 text-orange-800' : 
                                  submission.hiring_type === 'permanent' ? 'bg-green-100 text-green-800' : 
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {submission.hiring_type === 'both' ? 'Contractor & Permanent' : 
                                   submission.hiring_type.charAt(0).toUpperCase() + submission.hiring_type.slice(1)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {submission.nationality && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Nationality</div>
                              <div className="mt-1 text-base">
                                {submission.nationality}
                              </div>
                            </div>
                          )}
                          
                          {submission.roles && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Interested Roles</div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {Array.isArray(submission.roles)
                                  ? submission.roles.map((role: string, index: number) => (
                                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded flex items-center">
                                        <Tag className="h-3 w-3 mr-1 text-blue-500" />
                                        {role}
                                      </span>
                                    ))
                                  : formatArrayData(submission.roles).split(', ').map((role: string, index: number) => (
                                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded flex items-center">
                                        <Tag className="h-3 w-3 mr-1 text-blue-500" />
                                        {role}
                                      </span>
                                    ))
                                }
                              </div>
                            </div>
                          )}
                          
                          {submission.file_name && (
                            <div>
                              <div className="text-sm font-medium text-gray-500">Resume</div>
                              <div className="mt-1 flex items-center bg-gray-100 p-2 rounded">
                                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                                <div className="text-sm text-gray-700">{submission.file_name}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Message */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-medium">Contact Message</h2>
                  </div>
                  
                  <div className="p-6">
                    {submission.message ? (
                      <div className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded border border-gray-100">
                        {submission.message}
                      </div>
                    ) : (
                      <div className="text-gray-500 italic text-center p-4">
                        No message provided
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - management controls */}
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium">Manage Submission</h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {/* Status */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  
                  {/* Notes */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Add internal notes about this contact submission..."
                    ></textarea>
                  </div>
                  
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </form>
                
                {/* Quick actions */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${submission.email}`}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email {submission.name}
                    </a>
                    {submission.phone && (
                      <a
                        href={`tel:${submission.phone}`}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call {submission.name}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}