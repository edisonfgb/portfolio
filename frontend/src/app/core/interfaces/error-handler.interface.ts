import { InjectionToken } from '@angular/core';
import { Observable, throwError } from 'rxjs';

export interface ErrorHandler {
  handleError(error: unknown): Observable<never>;
}