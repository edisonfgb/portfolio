export interface EducationModel {
  id: string;
  institution: string;
  title: string;
  period: string;
  description: string | null;
  areas: string[];
  grade: string | null;
  logoUrl: string | null;
  featured: boolean;
  order: number;
}