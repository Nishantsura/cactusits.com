"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Phone, ArrowLeft, Trash2, ExternalLink, Tag, Clock, Info, Search, Filter, X, Calendar, CheckCircle } from 'lucide-react';
import { getContactSubmissions, deleteContactSubmission, updateContactSubmission } from '@/lib/data-utils';
import { format, parseISO, isWithinInterval, subDays, startOfDay, endOfDay } from 'date-fns';

/**
 * Admin page for managing contact form submissions
 * Displays all contact submissions with options to view details and manage status
 */
export default function ContactsAdmin() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [updateStatus, setUpdateStatus] = useState<{id: number, status: string} | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Check authentication and fetch submissions on load
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
        
        // Fetch contact submissions data
        await fetchSubmissions();
      } catch (error) {
        localStorage.removeItem('adminAuth');
        router.push('/admin');
      }
    };
    
    checkAuthAndFetchData();
  }, [router]);
  
  // Fetch contact submissions from the database
  const fetchSubmissions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await getContactSubmissions();
      
      if (error) {
        throw new Error('Failed to fetch contact submissions');
      }
      
      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching contact submissions');
      console.error('Error fetching contact submissions:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle quick status update
  const handleQuickStatusUpdate = async (id: number, newStatus: string) => {
    setIsUpdating(true);
    
    try {
      const { error } = await updateContactSubmission(id, { status: newStatus });
      
      if (error) {
        throw new Error('Failed to update status');
      }
      
      // Update local state to reflect changes
      setSubmissions(submissions.map(submission => 
        submission.id === id ? { ...submission, status: newStatus } : submission
      ));
      
      setFilteredSubmissions(filteredSubmissions.map(submission => 
        submission.id === id ? { ...submission, status: newStatus } : submission
      ));
      
      setUpdateStatus(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating status');
      console.error('Error updating status:', err);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Apply filters
  useEffect(() => {
    let results = [...submissions];
    
    // Apply search term filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      results = results.filter(submission => 
        submission.name?.toLowerCase().includes(search) || 
        submission.email?.toLowerCase().includes(search) ||
        submission.message?.toLowerCase().includes(search) ||
        submission.organization?.toLowerCase().includes(search)
      );
    }
    
    // Apply user type filter
    if (userTypeFilter !== 'all') {
      results = results.filter(submission => submission.user_type === userTypeFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(submission => submission.status === statusFilter || 
        (!submission.status && statusFilter === 'new'));
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let startDate;
      
      switch(dateFilter) {
        case 'today':
          startDate = startOfDay(now);
          break;
        case 'yesterday':
          startDate = startOfDay(subDays(now, 1));
          break;
        case 'week':
          startDate = startOfDay(subDays(now, 7));
          break;
        case 'month':
          startDate = startOfDay(subDays(now, 30));
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        results = results.filter(submission => {
          const submissionDate = parseISO(submission.created_at);
          return dateFilter === 'yesterday'
            ? isWithinInterval(submissionDate, { 
                start: startOfDay(subDays(now, 1)), 
                end: endOfDay(subDays(now, 1)) 
              })
            : submissionDate >= startDate;
        });
      }
    }
    
    setFilteredSubmissions(results);
  }, [submissions, searchTerm, userTypeFilter, statusFilter, dateFilter]);
  
  // Handle submission deletion
  const handleDeleteSubmission = async (submissionId: number) => {
    try {
      const { error } = await deleteContactSubmission(submissionId);
      
      if (error) {
        throw new Error('Failed to delete contact submission');
      }
      
      // Remove from local state
      setSubmissions(submissions.filter(submission => submission.id !== submissionId));
      setDeleteConfirm(null);
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the contact submission');
      console.error('Error deleting contact submission:', err);
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
  
  // Format text excerpt for display
  const formatExcerpt = (text: string, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
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
              <h1 className="text-2xl font-bold">Contact Submissions</h1>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center" style={{ minHeight: '300px' }}>
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600">Loading submissions...</p>
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700 mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Contact Submissions</h1>
              <p className="text-gray-500 text-sm">{filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or message..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Filter button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary md:w-auto"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            {/* Expanded filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* User Type Filter */}
                <div>
                  <label htmlFor="user-type" className="block text-sm font-medium text-gray-700 mb-1">
                    User Type
                  </label>
                  <select
                    id="user-type"
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="all">All Types</option>
                    <option value="hiringManager">Hiring Manager</option>
                    <option value="jobSeeker">Job Seeker</option>
                  </select>
                </div>
                
                {/* Status Filter */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                
                {/* Date Filter */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <select
                    id="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Submissions list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-8">
              <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                {submissions.length === 0 ? 
                  "No contact submissions found" : 
                  "No submissions match the current filters"}
              </p>
              {submissions.length > 0 && filteredSubmissions.length === 0 && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setUserTypeFilter('all');
                    setStatusFilter('all');
                    setDateFilter('all');
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start">
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-1 text-gray-400" /> 
                              <a href={`mailto:${submission.email}`} className="text-blue-500 hover:underline">
                                {submission.email}
                              </a>
                            </div>
                            {submission.phone && (
                              <div className="text-sm text-gray-500 flex items-center">
                                <Phone className="h-4 w-4 mr-1 text-gray-400" /> 
                                <a href={`tel:${submission.phone}`} className="text-blue-500 hover:underline">
                                  {submission.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getUserTypeDisplay(submission.user_type)}
                        </div>
                        {submission.user_type === 'hiringManager' && (
                          <>
                            {submission.organization && (
                              <div className="text-xs text-gray-500 mt-1">
                                {submission.organization}
                              </div>
                            )}
                            {submission.hiring_positions && (
                              <div className="text-xs text-gray-500 mt-1 flex flex-wrap">
                                <Tag className="h-3 w-3 mr-1 text-gray-400" /> 
                                {formatArrayData(submission.hiring_positions)}
                              </div>
                            )}
                          </>
                        )}
                        {submission.user_type === 'jobSeeker' && (
                          <>
                            {submission.nationality && (
                              <div className="text-xs text-gray-500 mt-1">
                                {submission.nationality}
                              </div>
                            )}
                            {submission.roles && (
                              <div className="text-xs text-gray-500 mt-1 flex flex-wrap">
                                <Tag className="h-3 w-3 mr-1 text-gray-400" /> 
                                {formatArrayData(submission.roles)}
                              </div>
                            )}
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {formatExcerpt(submission.message, 150)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {updateStatus && updateStatus.id === submission.id ? (
                          <div className="flex items-center space-x-2">
                            <select
                              value={updateStatus.status}
                              onChange={(e) => setUpdateStatus({id: submission.id, status: e.target.value})}
                              className="text-xs rounded border-gray-300 focus:ring-primary focus:border-primary"
                              disabled={isUpdating}
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In Progress</option>
                              <option value="contacted">Contacted</option>
                              <option value="closed">Closed</option>
                            </select>
                            <button
                              onClick={() => handleQuickStatusUpdate(submission.id, updateStatus.status)}
                              disabled={isUpdating}
                              className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                            >
                              {isUpdating ? (
                                <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                'Save'
                              )}
                            </button>
                            <button
                              onClick={() => setUpdateStatus(null)}
                              disabled={isUpdating}
                              className="text-xs text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span 
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(submission.status)}`}
                              onClick={() => setUpdateStatus({id: submission.id, status: submission.status || 'new'})}
                              role="button"
                              title="Click to change status"
                            >
                              {submission.status || 'new'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(submission.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-2">
                          <Link
                            href={`/admin/dashboard/contacts/${submission.id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View details"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(submission.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete submission"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {/* Delete confirmation - appears inline in the row */}
                        {deleteConfirm === submission.id && (
                          <div className="absolute right-8 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 p-3 z-10">
                            <p className="text-sm text-gray-700 mb-2">Delete this submission?</p>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeleteSubmission(submission.id)}
                                className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
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
