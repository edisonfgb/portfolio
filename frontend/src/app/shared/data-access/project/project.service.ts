import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ProjectsResponseSchema } from './project-response.schema';
import { ProjectsResponseDTO } from './project-response.dto';
import { ERROR_HANDLER } from '@core/tokens/error-handler.token';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ERROR_HANDLER);

  private readonly PROJECTS_URL = 'data/projects.json';

  public getProjects(): Observable<ProjectsResponseDTO> {
    return this.http.get<unknown>(this.PROJECTS_URL).pipe(
      map((response) => ProjectsResponseSchema.parse(response)),
      catchError((error: unknown) => {
        console.log(error);
        return this.errorHandler.handleError(error);
      })
    );
  }
}