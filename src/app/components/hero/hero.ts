import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { ResumeService } from '../../services/resume.service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  themeService = inject(ThemeService);
  resumeService = inject(ResumeService);

  onDownloadResume(): void {
    this.resumeService.downloadResume();
  }

  onViewResume(): void {
    this.resumeService.viewResume();
  }
}
