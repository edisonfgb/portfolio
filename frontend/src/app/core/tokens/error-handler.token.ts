import { InjectionToken, inject } from '@angular/core';
import { ErrorHandler } from '../interfaces/error-handler.interface';
import { HttpErrorHandler } from '../utils/handlers/error.handler';

export const ERROR_HANDLER = new InjectionToken<ErrorHandler>('ErrorHandler', {
  providedIn: 'root',
  factory: () => inject(HttpErrorHandler),
});