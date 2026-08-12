import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ScrollFabSection {
  id: string;
  label: string;
}

@Component({
  selector: 'app-scroll-fab',
  standalone: true,
  templateUrl: './scroll-fab.component.html',
  styleUrl: './scroll-fab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollFabComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) sections: ScrollFabSection[] = [];

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly ratiosById = new Map<string, number>();
  private observer: IntersectionObserver | null = null;

  protected readonly hovered = signal(false);
  protected readonly activeId = signal<string | null>(null);

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.observer = new IntersectionObserver((entries) => this.onIntersect(entries), {
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    for (const section of this.sections) {
      const element = document.getElementById(section.id);
      if (element) {
        this.observer.observe(element);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  protected onEnter(): void {
    this.hovered.set(true);
  }

  protected onLeave(): void {
    this.hovered.set(false);
  }

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      this.ratiosById.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    }

    let bestId: string | null = null;
    let bestRatio = 0;

    for (const [id, ratio] of this.ratiosById) {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    }

    if (bestId) {
      this.activeId.set(bestId);
    }
  }
}