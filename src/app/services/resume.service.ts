import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private readonly resumeUrl = '/assets/resume.pdf';
  private readonly resumeFileName = 'Arun_J_Resume.pdf';

  constructor() { }

  /**
   * Downloads the resume file
   */
  downloadResume(): void {
    const link = document.createElement('a');
    link.href = this.resumeUrl;
    link.download = this.resumeFileName;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optional: Track download analytics
    this.trackDownload();
  }

  /**
   * Opens resume in a new tab for viewing
   */
  viewResume(): void {
    window.open(this.resumeUrl, '_blank');
    this.trackView();
  }

  /**
   * Gets the resume URL
   */
  getResumeUrl(): string {
    return this.resumeUrl;
  }

  /**
   * Gets the resume filename
   */
  getResumeFileName(): string {
    return this.resumeFileName;
  }

  /**
   * Track resume downloads (for analytics)
   */
  private trackDownload(): void {
    console.log('Resume downloaded');
    // Here you could integrate with analytics services like Google Analytics
    // gtag('event', 'download', { file_name: this.resumeFileName });
  }

  /**
   * Track resume views (for analytics)
   */
  private trackView(): void {
    console.log('Resume viewed');
    // Here you could integrate with analytics services
    // gtag('event', 'view', { file_name: this.resumeFileName });
  }
}
