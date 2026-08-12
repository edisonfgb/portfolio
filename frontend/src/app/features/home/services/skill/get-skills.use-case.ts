import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UseCase } from '@core/interfaces/use-case.interface';
import { LanguageService } from '@core/services/language.service';
import { SkillService } from './skill.service';
import { SkillModel } from './skill.model';
import { toSkillModelList } from './skill.mapper';

@Injectable({ providedIn: 'root' })
export class GetSkillsUseCase implements UseCase<Observable<SkillModel[]>> {
  private readonly skillService = inject(SkillService);
  private readonly languageService = inject(LanguageService);

  public execute(): Observable<SkillModel[]> {
    const lang = this.languageService.getLanguage();
    return this.skillService.getSkills().pipe(
      map((dtos) => toSkillModelList(dtos, lang))
    );
  }
}