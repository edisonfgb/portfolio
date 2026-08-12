import { Language } from '@core/constants/language.constants';
import { GetEducationDTO } from './education-response.dto';
import { EducationModel } from './education.model';

export function toEducationModel(dto: GetEducationDTO, lang: Language): EducationModel {
  return {
    id: dto.id,
    institution: dto.institution,
    title: dto.title[lang],
    period: dto.period[lang],
    description: dto.description[lang],
    areas: dto.areas[lang],
    grade: dto.grade,
    logoUrl: dto.logoUrl,
    featured: dto.featured,
    order: dto.order,
  };
}

export function toEducationModelList(dtos: GetEducationDTO[], lang: Language): EducationModel[] {
  return dtos.map((dto) => toEducationModel(dto, lang));
}