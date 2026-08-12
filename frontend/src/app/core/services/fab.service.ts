import { Injectable, signal } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class FabService {
  private readonly fabPortal = signal<TemplatePortal | null>(null);
  readonly portal = this.fabPortal.asReadonly();

  set(portal: TemplatePortal): void {
    this.fabPortal.set(portal);
  }

  clear(): void {
    this.fabPortal.set(null);
  }
}