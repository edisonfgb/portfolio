import { ProjectCategory } from '@core/constants/project-category.constants';

export interface ProjectRepoModel {
  title: string;
  url: string;
}

export interface ProjectModel {
  id: string;
  name: string;
  category: ProjectCategory;
  featured: boolean;
  order: number;
  role: string;
  period: string;
  shortDescription: string;
  detailedDescription: string;
  stack: string[];
  highlights: string[];
  repos: ProjectRepoModel[];
  demoUrl: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
}