import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { GlobalConstants } from '../../../global-constants';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-academy-list',
  templateUrl: './academy-list.component.html',
  styleUrls: ['./academy-list.component.scss']
})
export class AcademyListComponent implements OnInit {

  public courses: any[] = [];
  public loading = true;
  public tags: any[] = [];
  public selectedTags: string[] = [];
  public searchTerm: string = '';
  
  // Filtros
  public sortBy: string = 'order'; // 'order', 'date', 'rating', 'views', 'price'
  public sortOrder: string = 'asc'; // 'asc', 'desc'
  public priceFilter: string = 'all'; // 'all', 'free', 'paid', '0-50', '50-100', etc.

  constructor(
    public router: Router,
    public academyService: AcademyService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    // Verificar y vincular automáticamente con la academia si el usuario está logueado en Oportunalia
    this.autoLinkWithAcademy();
    this.loadCourses();
    this.loadTags();
  }

  autoLinkWithAcademy(): void {
    const oportunaliaToken = this.userService.getToken();
    
    if (!oportunaliaToken) {
      return; // No hay usuario de Oportunalia logueado
    }

    // Si ya tiene token de academia, no hacer nada
    if (this.academyService.isAuthenticated()) {
      return;
    }

    // Verificar si el usuario existe en la academia y vincular automáticamente
    this.academyService.checkOportunaliaUser(oportunaliaToken).subscribe(
      (response: any) => {
        if (response.code === 200 && response.response) {
          // Si ya está registrado, guardar token de academia automáticamente
          if (response.response.already_registered && response.response.token) {
            localStorage.setItem('academy_token', response.response.token);
            if (response.response.student) {
              localStorage.setItem('academy_student', JSON.stringify(response.response.student));
            }
            // Vinculación automática completada silenciosamente
          }
          // Si no está registrado, no hacer nada (se registrará cuando acceda a login/register)
        }
      },
      (error: any) => {
        // Error al verificar, no hacer nada (no es crítico)
        console.log('No se pudo verificar vinculación con academia:', error);
      }
    );
  }

  loadCourses(): void {
    this.loading = true;
    const params: any = {};
    if (this.selectedTags.length > 0) {
      params.tags = this.selectedTags.join(',');
    }
    if (this.searchTerm) {
      params.search = this.searchTerm;
    }
    
    // Agregar filtros de ordenamiento
    if (this.sortBy) {
      params.sort_by = this.sortBy;
    }
    if (this.sortOrder) {
      params.sort_order = this.sortOrder;
    }
    
    // Agregar filtro de precio
    if (this.priceFilter && this.priceFilter !== 'all') {
      params.price_filter = this.priceFilter;
    }

    this.academyService.getCourses(params).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.courses = response.response?.data || response.response || [];
          // Construir URLs completas para thumbnails
          this.courses = this.courses.map(course => ({
            ...course,
            thumbnail_url: course.thumbnail_path ? this.getFileUrl(course.thumbnail_path) : null,
            average_rating: course.average_rating || 0,
            total_ratings: course.total_ratings || 0,
            total_views: course.total_views || 0
          }));
        }
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al cargar cursos:', error);
        this.loading = false;
      }
    );
  }

  loadTags(): void {
    this.academyService.getTags().subscribe(
      (response: any) => {
        if (response.code === 200) {
          // El backend devuelve un array de strings, convertimos a objetos con tag_name
          const tagNames = response.response || [];
          this.tags = tagNames
            .filter((tag: string) => tag && tag.trim() !== '') // Filtrar tags vacíos
            .map((tag: string) => ({ tag_name: tag.trim() })); // Convertir a objetos
        }
      },
      (error: any) => {
        console.error('Error al cargar tags:', error);
      }
    );
  }

  onTagToggle(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.loadCourses();
  }

  onSearch(): void {
    this.loadCourses();
  }

  onSortChange(): void {
    this.loadCourses();
  }

  onPriceFilterChange(): void {
    this.loadCourses();
  }

  goToCourse(courseId: number): void {
    this.router.navigate(['/academy/course', courseId]);
  }

  getFileUrl(path: string): string {
    if (!path) return '';
    return `${GlobalConstants.apiBase}${path}`;
  }
}

