import { supabase } from "./supabase";

/**
 * Utility functions for data fetching from Supabase
 * This keeps database interactions in one place for easier maintenance
 */

/**
 * Get all active job listings
 */
export async function getJobs() {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("posted_date", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { data: null, error };
  }
}

/**
 * Get job by ID
 */
export async function getJobById(id: number) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Create a new job listing
 */
export async function createJob(jobData: any) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error creating job:", error);
    return { data: null, error };
  }
}

/**
 * Update an existing job
 */
export async function updateJob(id: number, jobData: any) {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .update(jobData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error updating job with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Delete a job (or set as inactive)
 * Prefer setting is_active to false instead of deleting for data retention
 */
export async function deleteJob(id: number, hardDelete = false) {
  try {
    let data, error;

    if (hardDelete) {
      // Permanent deletion
      ({ data, error } = await supabase.from("jobs").delete().eq("id", id));
    } else {
      // Soft deletion (set as inactive)
      ({ data, error } = await supabase
        .from("jobs")
        .update({ is_active: false })
        .eq("id", id)
        .select());
    }

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error deleting job with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Get all services
 */
export async function getServices() {
  try {
    const { data, error } = await supabase.from("services").select("*");

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching services:", error);
    return { data: null, error };
  }
}

/**
 * Create a new service
 */
export async function createService(serviceData: any) {
  try {
    // Add timestamp for updated_at
    const dataWithTimestamp = {
      ...serviceData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("services")
      .insert([dataWithTimestamp])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error creating service:", error);
    return { data: null, error };
  }
}

/**
 * Update an existing service
 */
export async function updateService(id: number, serviceData: any) {
  try {
    // Add timestamp for updated_at
    const dataWithTimestamp = {
      ...serviceData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("services")
      .update(dataWithTimestamp)
      .eq("id", id)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error updating service with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Delete a service
 */
export async function deleteService(id: number) {
  try {
    const { data, error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Get service by ID
 */
export async function getServiceById(id: number) {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Get service by slug
 */
export async function getServiceBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return { data: null, error };
  }
}

/**
 * Get all industries
 */
export async function getIndustries() {
  try {
    const { data, error } = await supabase.from("industries").select("*");

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching industries:", error);
    return { data: null, error };
  }
}

/**
 * Get industry by ID
 */
export async function getIndustryById(id: number) {
  try {
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching industry with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Get industry by slug
 */
export async function getIndustryBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching industry with slug ${slug}:`, error);
    return { data: null, error };
  }
}

/**
 * Create a new industry
 */
export async function createIndustry(industryData: any) {
  try {
    // Add timestamp for updated_at
    const dataWithTimestamp = {
      ...industryData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("industries")
      .insert([dataWithTimestamp])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error creating industry:", error);
    return { data: null, error };
  }
}

/**
 * Update an existing industry
 */
export async function updateIndustry(id: number, industryData: any) {
  try {
    // Add timestamp for updated_at
    const dataWithTimestamp = {
      ...industryData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("industries")
      .update(dataWithTimestamp)
      .eq("id", id)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error updating industry with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Delete an industry
 */
export async function deleteIndustry(id: number) {
  try {
    const { data, error } = await supabase
      .from("industries")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error deleting industry with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Get all testimonials, optionally filtered by type
 */
export async function getTestimonials(type?: "client" | "employee") {
  try {
    let query = supabase.from("testimonials").select("*");

    if (type) {
      query = query.eq("type", type);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return { data: null, error };
  }
}

/**
 * Get all contact form submissions
 */
export async function getContactSubmissions() {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return { data: null, error };
  }
}

/**
 * Get contact submission by ID
 */
export async function getContactSubmissionById(id: number) {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error fetching contact submission with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Update a contact submission's status and notes
 */
export async function updateContactSubmission(id: number, updateData: any) {
  try {
    // Add timestamp for updated_at
    const dataWithTimestamp = {
      ...updateData,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("contact_submissions")
      .update(dataWithTimestamp)
      .eq("id", id)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error updating contact submission with ID ${id}:`, error);
    return { data: null, error };
  }
}

/**
 * Delete a contact submission
 */
export async function deleteContactSubmission(id: number) {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error deleting contact submission with ID ${id}:`, error);
    return { data: null, error };
  }
}
