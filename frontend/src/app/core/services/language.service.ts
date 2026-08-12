import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DEFAULT_LANGUAGE, LANGUAGES, Language } from '@core/constants/language.constants';

const LANGUAGE_STORAGE_KEY = 'portfolio_language';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly currentLanguage = signal<Language>(this.resolveInitialLanguage());

  public readonly language = this.currentLanguage.asReadonly();

  public setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    if (this.isBrowser) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }

  public getLanguage(): Language {
    return this.currentLanguage();
  }

  private resolveInitialLanguage(): Language {
    if (!this.isBrowser) {
      return DEFAULT_LANGUAGE;
    }
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (this.isValidLanguage(stored)) {
      return stored;
    }
    return DEFAULT_LANGUAGE;
  }

  private isValidLanguage(value: string | null): value is Language {
    return value !== null && (LANGUAGES as readonly string[]).includes(value);
  }
}