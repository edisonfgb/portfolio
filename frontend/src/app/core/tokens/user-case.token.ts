import { InjectionToken } from '@angular/core';
import { UseCase } from '../interfaces/use-case.interface';

export function createUseCaseToken<Output, Input = void>(
  description: string
): InjectionToken<UseCase<Output, Input>> {
  return new InjectionToken<UseCase<Output, Input>>(description);
}