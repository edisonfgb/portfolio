import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UseCase } from '@core/interfaces/use-case.interface';
import { LanguageService } from '@core/services/language.service';
import { EducationService } from './education.service';
import { EducationModel } from './education.model';
import { toEducationModelList } from './education.mapper';

@Injectable({ providedIn: 'root' })
export class GetEducationUseCase implements UseCase<Observable<EducationModel[]>> {
  private readonly educationService = inject(EducationService);
  private readonly languageService = inject(LanguageService);

  public execute(): Observable<EducationModel[]> {
    const lang = this.languageService.getLanguage();
    return this.educationService.getEducation().pipe(
      map((dtos) => toEducationModelList(dtos, lang))
    );
  }
}