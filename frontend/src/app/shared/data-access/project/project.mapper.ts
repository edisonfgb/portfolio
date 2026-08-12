import { Language } from '@core/constants/language.constants';
import { ProjectDTO } from './project-response.dto';
import { ProjectModel, ProjectRepoModel } from './project.model';

export function toProjectModel(dto: ProjectDTO, lang: Language): ProjectModel {
  return {
    id: dto.id,
    name: dto.name[lang],
    category: dto.category,
    featured: dto.featured,
    order: dto.order,
    role: dto.role[lang],
    period: dto.period[lang],
    shortDescription: dto.shortDescription[lang],
    detailedDescription: dto.detailedDescription[lang],
    stack: dto.stack,
    highlights: dto.highlights[lang],
    repos: dto.repos.map((repo) => toProjectRepoModel(repo, lang)),
    demoUrl: dto.demoUrl,
    videoUrl: dto.videoUrl,
    imageUrl: dto.imageUrl,
  };
}

export function toProjectModelList(dtos: ProjectDTO[], lang: Language): ProjectModel[] {
  return dtos.map((dto) => toProjectModel(dto, lang));
}

function toProjectRepoModel(repo: ProjectDTO['repos'][number], lang: Language): ProjectRepoModel {
  return {
    title: repo.title[lang],
    url: repo.url,
  };
}