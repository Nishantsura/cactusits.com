export interface Job {
  id: number;
  title: string;
  salary: string;
  location: string;
  type: string;
  postedDays: number;
  category: string;
  company: string;
  description: string;
  applyLink?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
}
