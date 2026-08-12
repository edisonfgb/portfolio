import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { SkillsResponseSchema } from './skill-response.schema';
import { GetSkillsResponseDTO } from './skill-response.dto';
import { ERROR_HANDLER } from '@core/tokens/error-handler.token';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ERROR_HANDLER);

  private readonly SKILLS_URL = 'data/skills.json';

  public getSkills(): Observable<GetSkillsResponseDTO> {
    return this.http.get<unknown>(this.SKILLS_URL).pipe(
      map((response) => SkillsResponseSchema.parse(response)),
      catchError((error: unknown) => this.errorHandler.handleError(error))
    );
  }
}