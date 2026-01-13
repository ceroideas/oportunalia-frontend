import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { GlobalConstants } from '../../../global-constants';

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

  constructor(
    public router: Router,
    public academyService: AcademyService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadTags();
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

    this.academyService.getCourses(params).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.courses = response.response?.data || response.response || [];
          // Construir URLs completas para thumbnails
          this.courses = this.courses.map(course => ({
            ...course,
            thumbnail_url: course.thumbnail_path ? this.getFileUrl(course.thumbnail_path) : null
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

  goToCourse(courseId: number): void {
    this.router.navigate(['/academy/course', courseId]);
  }

  getFileUrl(path: string): string {
    if (!path) return '';
    return `${GlobalConstants.apiBase}${path}`;
  }
}

