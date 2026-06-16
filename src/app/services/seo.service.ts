import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

const CANONICAL_BASE = 'https://oportunalia.com';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private linkCanonical: HTMLLinkElement | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateCanonical());
    this.updateCanonical();
  }

  updateCanonical(path?: string): void {
    const canonicalPath = path ?? this.router.url.split('?')[0].split('#')[0];
    const href = `${CANONICAL_BASE}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;

    if (!this.linkCanonical) {
      this.linkCanonical = this.document.querySelector('link[rel="canonical"]');
      if (!this.linkCanonical) {
        this.linkCanonical = this.document.createElement('link');
        this.linkCanonical.setAttribute('rel', 'canonical');
        this.document.head.appendChild(this.linkCanonical);
      }
    }

    this.linkCanonical.setAttribute('href', href);
  }
}
