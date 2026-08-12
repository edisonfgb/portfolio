import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { EducationResponseSchema } from './education-response.schema';
import { GetEducationResponseDTO } from './education-response.dto';
import { ERROR_HANDLER } from '@core/tokens/error-handler.token';

@Injectable({ providedIn: 'root' })
export class EducationService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ERROR_HANDLER);

  private readonly EDUCATION_URL = 'data/education.json';

  public getEducation(): Observable<GetEducationResponseDTO> {
    return this.http.get<unknown>(this.EDUCATION_URL).pipe(
      map((response) => EducationResponseSchema.parse(response)),
      catchError((error: unknown) => this.errorHandler.handleError(error))
    );
  }
}