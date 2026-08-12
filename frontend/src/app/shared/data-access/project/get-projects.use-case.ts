import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UseCase } from '@core/interfaces/use-case.interface';
import { LanguageService } from '@core/services/language.service';
import { ProjectService } from '@shared/data-access/project/project.service';
import { ProjectModel } from '@shared/data-access/project/project.model';
import { toProjectModelList } from '@shared/data-access/project/project.mapper';

@Injectable({ providedIn: 'root' })
export class GetProjectsUseCase implements UseCase<Observable<ProjectModel[]>> {
  private readonly projectService = inject(ProjectService);
  private readonly languageService = inject(LanguageService);

  public execute(): Observable<ProjectModel[]> {
    const lang = this.languageService.getLanguage();
    return this.projectService.getProjects().pipe(
      map((dtos) => toProjectModelList(dtos, lang))
    );
  }
}