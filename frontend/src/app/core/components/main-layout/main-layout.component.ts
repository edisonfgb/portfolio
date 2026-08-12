import { Component, OnDestroy, OnInit, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@core/services/language.service';
import { Language } from '@core/constants/language.constants';
import { FabService } from '@core/services/fab.service';

const BRAND_TEXT = 'EdisonGutierrez.dev';
const TYPING_SPEED_MS = 90;
const DELETING_SPEED_MS = 45;
const PAUSE_AFTER_TYPING_MS = 2200;
const PAUSE_AFTER_DELETING_MS = 600;

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, PortalModule, TranslatePipe],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  protected readonly fabService = inject(FabService);
  private readonly languageService = inject(LanguageService);
  private readonly translateService = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private typewriterTimeoutId: ReturnType<typeof setTimeout> | undefined;

  protected readonly currentLanguage = this.languageService.language;
  protected readonly brandDisplayText = signal(this.isBrowser ? '' : BRAND_TEXT);

  constructor() {
    effect(() => {
      this.translateService.use(this.languageService.language());
    });
  }

  public ngOnInit(): void {
    if (this.isBrowser) {
      this.runTypewriterCycle(0, 'typing');
    }
  }

  public ngOnDestroy(): void {
    if (this.typewriterTimeoutId) {
      clearTimeout(this.typewriterTimeoutId);
    }
  }

  protected setLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }

  private runTypewriterCycle(charIndex: number, phase: 'typing' | 'deleting'): void {
    if (phase === 'typing') {
      this.brandDisplayText.set(BRAND_TEXT.slice(0, charIndex));

      if (charIndex < BRAND_TEXT.length) {
        this.typewriterTimeoutId = setTimeout(
          () => this.runTypewriterCycle(charIndex + 1, 'typing'),
          TYPING_SPEED_MS
        );
      } else {
        this.typewriterTimeoutId = setTimeout(
          () => this.runTypewriterCycle(charIndex, 'deleting'),
          PAUSE_AFTER_TYPING_MS
        );
      }
      return;
    }

    this.brandDisplayText.set(BRAND_TEXT.slice(0, charIndex));

    if (charIndex > 0) {
      this.typewriterTimeoutId = setTimeout(
        () => this.runTypewriterCycle(charIndex - 1, 'deleting'),
        DELETING_SPEED_MS
      );
    } else {
      this.typewriterTimeoutId = setTimeout(
        () => this.runTypewriterCycle(0, 'typing'),
        PAUSE_AFTER_DELETING_MS
      );
    }
  }
}