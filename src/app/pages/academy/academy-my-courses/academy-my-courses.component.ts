import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { GlobalConstants } from '../../../global-constants';

@Component({
  selector: 'app-academy-my-courses',
  templateUrl: './academy-my-courses.component.html',
  styleUrls: ['./academy-my-courses.component.scss']
})
export class AcademyMyCoursesComponent implements OnInit {

  public courses: any[] = [];
  public opportunities: any[] = [];
  public loading = true;
  public loadingOpportunities = false;
  public activeTab: 'courses' | 'opportunities' = 'courses';

  constructor(
    public router: Router,
    public academyService: AcademyService
  ) { }

  ngOnInit(): void {
    if (!this.academyService.isAuthenticated()) {
      this.router.navigate(['/academy/login'], { queryParams: { returnUrl: '/academy/my-courses' } });
      return;
    }
    this.loadMyCourses();
  }

  switchTab(tab: 'courses' | 'opportunities'): void {
    this.activeTab = tab;
    if (tab === 'opportunities' && this.opportunities.length === 0 && !this.loadingOpportunities) {
      this.loadOpportunities();
    }
  }

  loadOpportunities(): void {
    this.loadingOpportunities = true;
    this.academyService.getOpportunities().subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.opportunities = response.response || [];
        }
        this.loadingOpportunities = false;
      },
      (error: any) => {
        console.error('Error al cargar oportunidades:', error);
        if (error.status === 401) {
          // Token inválido, redirigir a login
          this.router.navigate(['/academy/login'], { queryParams: { returnUrl: '/academy/my-courses' } });
        }
        this.loadingOpportunities = false;
      }
    );
  }

  goToOpportunity(linkRewrite: string): void {
    // Redirigir a la subasta en Oportunalia
    window.open(`/subasta/${linkRewrite}`, '_blank');
  }

  loadMyCourses(): void {
    this.loading = true;
    this.academyService.getMyCourses().subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.courses = response.response || [];
          // Construir URLs completas para thumbnails
          this.courses = this.courses.map(course => ({
            ...course,
            thumbnail_url: course.thumbnail_path ? this.getFileUrl(course.thumbnail_path) : null
          }));
        }
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al cargar mis cursos:', error);
        if (error.status === 401) {
          // Token inválido, redirigir a login
          this.router.navigate(['/academy/login'], { queryParams: { returnUrl: '/academy/my-courses' } });
        }
        this.loading = false;
      }
    );
  }

  goToCourse(courseId: number): void {
    this.router.navigate(['/academy/course', courseId]);
  }

  getFileUrl(path: string): string {
    if (!path) return '';
    return `${GlobalConstants.apiBase}${path}`;
  }

  getPaymentStatusBadge(status: string): string {
    switch(status) {
      case 'paid': return 'Completado';
      case 'pending': return 'Pendiente';
      case 'failed': return 'Fallido';
      case 'refunded': return 'Reembolsado';
      default: return status;
    }
  }

  getPaymentStatusClass(status: string): string {
    switch(status) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      case 'refunded': return 'status-refunded';
      default: return '';
    }
  }
}

