import { Language } from '@core/constants/language.constants';
import { GetSkillCategoryDTO } from './skill-response.dto';
import { SkillModel } from './skill.model';

export function toSkillModel(dto: GetSkillCategoryDTO, lang: Language): SkillModel {
  return {
    id: dto.id,
    name: dto.name[lang],
    featured: dto.featured,
    order: dto.order,
    skills: dto.skills.map((skill) => skill[lang]),
  };
}

export function toSkillModelList(dtos: GetSkillCategoryDTO[], lang: Language): SkillModel[] {
  return dtos.map((dto) => toSkillModel(dto, lang));
}