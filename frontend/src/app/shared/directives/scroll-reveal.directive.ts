import { Directive, ElementRef, OnDestroy, OnInit, PLATFORM_ID, Renderer2, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  public appScrollRevealDelay = input(0);

  public ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal');

    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(this.el.nativeElement, 'scroll-reveal--visible');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.renderer.addClass(this.el.nativeElement, 'scroll-reveal--visible');
      return;
    }

    if (this.appScrollRevealDelay() > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.appScrollRevealDelay()}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'scroll-reveal--visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}