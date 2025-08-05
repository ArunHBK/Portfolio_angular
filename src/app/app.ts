import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Hero,
    About,
    Skills,
    Projects,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('My Portfolio');
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    // Theme service is automatically initialized via dependency injection
    // The constructor handles theme setup
  }
}
