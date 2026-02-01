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
  public paginatedCourses: any[] = [];
  public loading = true;
  public tags: any[] = [];
  public selectedTags: string[] = [];
  public searchTerm: string = '';
  public sortCriteria: string = 'default';
  public sortOrder: string = 'asc';
  public priceFilter: string = 'all';
  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public totalPages: number = 1;

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
    if (this.sortCriteria && this.sortCriteria !== 'default') {
      params.order_by = this.sortCriteria;
      params.order = this.sortOrder;
    }

    this.academyService.getCourses(params).subscribe(
      (response: any) => {
        if (response.code === 200) {
          let courses = response.response?.data || response.response || [];
          
          // Aplicar filtro por precio en el frontend
          courses = this.applyPriceFilter(courses);
          
          // Aplicar ordenamiento en el frontend si es necesario
          if (this.sortCriteria !== 'default') {
            courses = this.applySorting(courses);
          }
          
          // Construir URLs completas para thumbnails
          this.courses = courses.map(course => ({
            ...course,
            thumbnail_url: course.thumbnail_path ? this.getFileUrl(course.thumbnail_path) : null
          }));
          
          // Aplicar paginación
          this.applyPagination();
        }
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al cargar cursos:', error);
        this.loading = false;
      }
    );
  }

  applyPriceFilter(courses: any[]): any[] {
    if (this.priceFilter === 'all') {
      return courses;
    }
    
    return courses.filter(course => {
      if (this.priceFilter === 'free') {
        return course.is_free === true;
      }
      if (this.priceFilter === 'paid') {
        return course.is_free === false;
      }
      
      const price = course.price || 0;
      switch (this.priceFilter) {
        case '0-50':
          return price >= 0 && price <= 50;
        case '50-100':
          return price > 50 && price <= 100;
        case '100-200':
          return price > 100 && price <= 200;
        case '200+':
          return price > 200;
        default:
          return true;
      }
    });
  }

  applySorting(courses: any[]): any[] {
    const sorted = [...courses];
    const order = this.sortOrder === 'asc' ? 1 : -1;
    
    sorted.sort((a, b) => {
      let valueA, valueB;
      
      switch (this.sortCriteria) {
        case 'antiquity':
          valueA = new Date(a.created_at || 0).getTime();
          valueB = new Date(b.created_at || 0).getTime();
          break;
        case 'rating':
          valueA = a.average_rating || 0;
          valueB = b.average_rating || 0;
          break;
        case 'views':
          valueA = a.views_count || 0;
          valueB = b.views_count || 0;
          break;
        case 'price':
          valueA = a.is_free ? 0 : (a.price || 0);
          valueB = b.is_free ? 0 : (b.price || 0);
          break;
        default:
          return 0;
      }
      
      if (valueA < valueB) return -1 * order;
      if (valueA > valueB) return 1 * order;
      return 0;
    });
    
    return sorted;
  }

  onSortChange(): void {
    this.currentPage = 1; // Reset a la primera página cuando cambia el orden
    this.loadCourses();
  }

  onPriceFilterChange(): void {
    this.currentPage = 1; // Reset a la primera página cuando cambia el filtro
    this.loadCourses();
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
    this.currentPage = 1; // Reset a la primera página cuando cambian los tags
    this.loadCourses();
  }

  onSearch(): void {
    this.currentPage = 1; // Reset a la primera página cuando se busca
    this.loadCourses();
  }

  applyPagination(): void {
    // Calcular total de páginas
    this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
    
    // Si la página actual es mayor que el total de páginas (por ejemplo, después de filtrar),
    // ajustar a la última página disponible o a la página 1 si no hay cursos
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    } else if (this.totalPages === 0) {
      this.currentPage = 1;
    }
    
    // Aplicar paginación
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCourses = this.courses.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
      // Scroll al inicio del grid
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
      // Scroll al inicio del grid
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToCourse(courseId: number): void {
    this.router.navigate(['/academy/course', courseId]);
  }

  getFileUrl(path: string): string {
    if (!path) return '';
    return `${GlobalConstants.apiBase}${path}`;
  }
}

