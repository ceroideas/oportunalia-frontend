import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AcademyService } from '../../../api/academy.service';
import { GlobalConstants } from '../../../global-constants';

@Component({
  selector: 'app-academy-detail',
  templateUrl: './academy-detail.component.html',
  styleUrls: ['./academy-detail.component.scss']
})
export class AcademyDetailComponent implements OnInit, OnDestroy {

  public course: any = null;
  public loading = true;
  public courseId: number;
  public videoProgress = 0;
  public videoPosition = 0;
  public videoElement: HTMLVideoElement | null = null;
  public youtubeEmbedUrl: SafeResourceUrl | null = null;
  private progressInterval: any;

  // Valoraciones
  public userRating: number = 0; // Valoración del usuario actual (0 = no valorado)
  public hoveredRating: number = 0; // Para el hover sobre las estrellas
  public averageRating: number = 0;
  public totalRatings: number = 0;
  public ratings: any[] = [];
  public loadingRatings = false;
  public ratingComment: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private sanitizer: DomSanitizer,
    public academyService: AcademyService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params.id;
      this.loadCourse();
    });
  }

  ngOnDestroy(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.saveProgress();
  }

  loadCourse(): void {
    this.loading = true;
    this.academyService.getCourse(this.courseId).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.course = response.response;
          
          // Construir URLs completas
          if (this.course.thumbnail_path) {
            this.course.thumbnail_url = this.getFileUrl(this.course.thumbnail_path);
          }
          if (this.course.video_path && !this.course.video_url) {
            this.course.video_url = this.getFileUrl(this.course.video_path);
          }

          // Cachear URL de embed de YouTube si es necesario (evita re-render del iframe)
          if (this.course.video_url && this.isYouTubeUrl(this.course.video_url)) {
            this.youtubeEmbedUrl = this.getYouTubeEmbedUrl(this.course.video_url);
          } else {
            this.youtubeEmbedUrl = null;
          }

          // Cargar progreso si está autenticado
          if (this.academyService.isAuthenticated()) {
            this.loadProgress();
          }

          // Cargar valoraciones
          this.loadRatings();
        }
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al cargar curso:', error);
        this.loading = false;
      }
    );
  }

  loadRatings(): void {
    this.loadingRatings = true;
    this.academyService.getCourseRatings(this.courseId).subscribe(
      (response: any) => {
        if (response.code === 200 && response.response) {
          this.averageRating = response.response.average_rating || 0;
          this.totalRatings = response.response.total_ratings || 0;
          this.ratings = response.response.ratings || [];

          // Si el usuario está autenticado, buscar su valoración
          if (this.academyService.isAuthenticated()) {
            const studentStr = localStorage.getItem('academy_student') || sessionStorage.getItem('academy_student');
            if (studentStr) {
              try {
                const student = JSON.parse(studentStr);
                const userRating = this.ratings.find((r: any) => r.student && r.student.id === student.id);
                if (userRating) {
                  this.userRating = userRating.rating;
                  this.ratingComment = userRating.comment || '';
                }
              } catch (e) {
                console.error('Error al parsear student:', e);
              }
            }
          }
        }
        this.loadingRatings = false;
      },
      (error: any) => {
        console.error('Error al cargar valoraciones:', error);
        this.loadingRatings = false;
      }
    );
  }

  onStarHover(rating: number): void {
    if (this.academyService.isAuthenticated()) {
      this.hoveredRating = rating;
    }
  }

  onStarLeave(): void {
    this.hoveredRating = 0;
  }

  onStarClick(rating: number): void {
    if (!this.academyService.isAuthenticated()) {
      this.goToLogin();
      return;
    }

    this.userRating = rating;
    this.submitRating();
  }

  submitRating(): void {
    if (!this.academyService.isAuthenticated() || this.userRating === 0) {
      return;
    }

    this.academyService.rateCourse(this.courseId, this.userRating, this.ratingComment).subscribe(
      (response: any) => {
        if (response.code === 200 && response.response) {
          // Actualizar valoraciones
          this.averageRating = response.response.average_rating || 0;
          this.totalRatings = response.response.total_ratings || 0;
          
          // Recargar valoraciones para obtener la lista actualizada
          this.loadRatings();
        }
      },
      (error: any) => {
        console.error('Error al valorar curso:', error);
      }
    );
  }

  loadProgress(): void {
    this.academyService.getCourseProgress(this.courseId).subscribe(
      (response: any) => {
        if (response.code === 200 && response.response) {
          this.videoProgress = response.response.progress_percentage || 0;
          this.videoPosition = response.response.last_position || 0;
          
          // Si hay posición guardada, saltar al video
          if (this.videoPosition > 0 && this.videoElement) {
            this.videoElement.currentTime = this.videoPosition;
          }
        }
      },
      (error: any) => {
        console.error('Error al cargar progreso:', error);
      }
    );
  }

  onVideoReady(video: HTMLVideoElement): void {
    this.videoElement = video;
    
    // Si hay posición guardada, saltar
    if (this.videoPosition > 0) {
      video.currentTime = this.videoPosition;
    }

    // Guardar progreso cada 10 segundos
    video.addEventListener('timeupdate', () => {
      if (video.duration) {
        this.videoProgress = Math.round((video.currentTime / video.duration) * 100);
        this.videoPosition = Math.round(video.currentTime);
      }
    });

    // Guardar progreso al finalizar
    video.addEventListener('ended', () => {
      this.videoProgress = 100;
      this.saveProgress();
    });
  }

  saveProgress(): void {
    if (this.academyService.isAuthenticated() && this.course && this.videoElement) {
      this.academyService.recordView(
        this.courseId,
        this.videoProgress,
        this.videoPosition
      ).subscribe(
        (response: any) => {
          // Progreso guardado
        },
        (error: any) => {
          console.error('Error al guardar progreso:', error);
        }
      );
    }
  }

  canAccessCourse(): boolean {
    if (!this.course) return false;
    
    // Si es gratis, puede acceder
    if (this.course.is_free) return true;
    
    // Si no está autenticado, no puede acceder
    if (!this.academyService.isAuthenticated()) return false;
    
    // Verificar si el estudiante tiene acceso pagado (viene del backend)
    // has_access es true si el curso es gratis O si está comprado
    // is_purchased es true solo si está comprado
    return this.course.has_access === true || this.course.is_purchased === true;
  }

  goToLogin(): void {
    this.router.navigate(['/academy/login'], { queryParams: { returnUrl: this.router.url } });
  }

  goToRegister(): void {
    this.router.navigate(['/academy/register'], { queryParams: { returnUrl: this.router.url } });
  }

  goToPurchase(): void {
    // TODO: Implementar redirección a Stripe checkout
    this.router.navigate(['/academy/course', this.courseId, 'purchase']);
  }

  addToMyCourses(): void {
    if (!this.academyService.isAuthenticated()) {
      this.goToLogin();
      return;
    }

    this.academyService.addToMyCourses(this.courseId).subscribe(
      (response: any) => {
        if (response.code === 200) {
          // Actualizar el curso para marcar que está en Mis Cursos
          this.course.is_in_my_courses = true;
          // Recargar el curso para obtener la información actualizada
          this.loadCourse();
        }
      },
      (error: any) => {
        console.error('Error al agregar curso a Mis Cursos:', error);
      }
    );
  }

  getFileUrl(path: string): string {
    if (!path) return '';
    return `${GlobalConstants.apiBase}${path}`;
  }

  isYouTubeUrl(url: string): boolean {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  }

  getYouTubeEmbedUrl(url: string): SafeResourceUrl {
    if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('');
    // Convertir URL de YouTube a embed
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  /**
   * Obtener URL completa de un material
   */
  getMaterialUrl(material: any): string {
    if (!material || !material.file_path) return '';
    return this.getFileUrl(material.file_path);
  }

  /**
   * Formatear tamaño de archivo
   */
  formatFileSize(bytes: number): string {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

