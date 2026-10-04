import { Component, signal } from '@angular/core';

interface ShortenedLink {
  original: string;
  shortened: string;
  copied: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  url = signal('');
  error = signal(false);
  menuOpen = signal(false);

  links = signal<ShortenedLink[]>([]);

  updateUrl(event: Event) {
    const input = event.target as HTMLInputElement;

    this.url.set(input.value);

    if (input.value.trim()) {
      this.error.set(false);
    }
  }

  shortenUrl() {
    const currentUrl = this.url().trim();

    if (!currentUrl) {
      this.error.set(true);
      return;
    }

    this.error.set(false);

    const newLink: ShortenedLink = {
      original: currentUrl,
      shortened: 'https://short.ly/' + Math.random().toString(36).slice(2, 8),
      copied: false,
    };

    this.links.update((links) => [newLink, ...links]);

    this.url.set('');
  }
  copyLink(index: number) {
    const link = this.links()[index];

    if (!link) {
      return;
    }

    this.links.update((links) =>
      links.map((item, i) => ({
        ...item,
        copied: i === index,
      })),
    );
  }
  toggleMenu() {
    this.menuOpen.update((value) => !value);
  }
}
