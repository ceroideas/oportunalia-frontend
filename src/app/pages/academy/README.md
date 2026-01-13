# Módulo de Academia - Frontend

Este módulo contiene toda la funcionalidad del frontend relacionada con Oportunalia Academy.

## Estructura del Módulo

- **AcademyListComponent**: Listado público de cursos disponibles
- **AcademyDetailComponent**: Detalle de curso con reproductor de video
- **AcademyLoginComponent**: Login de estudiantes
- **AcademyRegisterComponent**: Registro de estudiantes
- **AcademyMyCoursesComponent**: Lista de cursos del estudiante autenticado

## Cómo Desactivar el Módulo

Para desactivar completamente el módulo de Academia en el frontend:

### 1. Comentar la ruta en `app-routing.module.ts`

En `src/app/app-routing.module.ts`, comenta estas líneas (aproximadamente línea 52):

```typescript
// { path: 'academy', loadChildren: () => import('./pages/academy/academy.module').then(m => m.AcademyModule) },
```

### 2. Comentar el botón en `toolbar1.component.html`

En `src/app/theme/components/toolbar1/toolbar1.component.html`, comenta el bloque del botón de Academy (aproximadamente línea 63-70):

```html
<!-- 
<a routerLink="/academy" mat-raised-button ...>
  Oportunalia Academy
</a>
-->
```

### 3. (Opcional) Eliminar carpetas

Si deseas eliminar completamente el código del módulo:

- `src/app/pages/academy/` (toda la carpeta)
- `src/app/api/academy.service.ts`

## Re-activación

Para reactivar el módulo, simplemente descomenta las líneas mencionadas en los pasos anteriores.

## Autenticación

El módulo usa un token separado almacenado en `localStorage` o `sessionStorage` con la clave `academy_token`. Esto es independiente del token de usuario normal (`token`).

## Servicios

- **AcademyService**: Maneja todas las comunicaciones con la API de Academy
- Los métodos que requieren autenticación incluyen el token automáticamente
- El token se guarda al hacer login y se elimina al hacer logout

