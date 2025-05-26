import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Handles contact form submissions and stores them in Supabase
 * 
 * @param request The incoming request containing form data
 * @returns JSON response indicating success or failure
 */
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' }, 
        { status: 400 }
      );
    }
    
    // Common fields for all submission types
    const submissionData = {
      name: data.name,
      email: data.email,
      message: data.message || '',
      user_type: data.userType || 'hiringManager',
      // Extract phone number if available
      phone: data.phone || '',
      created_at: new Date().toISOString(),
    };
    
    // Add hiring manager specific fields
    if (data.userType === 'hiringManager') {
      Object.assign(submissionData, {
        organization: data.organization || '',
        website: data.website || '',
        hiring_positions: data.hiringPositions || [],
        hiring_type: data.hiringType || 'both'
      });
    }
    
    // Add job seeker specific fields
    if (data.userType === 'jobSeeker') {
      Object.assign(submissionData, {
        roles: data.roles || [],
        nationality: data.nationality || '',
        file_name: data.fileName || ''
      });
    }
    
    console.log('Submitting contact form data:', submissionData);
    
    // Insert form data into Supabase contact_submissions table
    const { error } = await supabase
      .from('contact_submissions')
      .insert([submissionData]);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again later.' }, 
      { status: 500 }
    );
  }
}
