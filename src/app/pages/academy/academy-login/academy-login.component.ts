import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-academy-login',
  templateUrl: './academy-login.component.html',
  styleUrls: ['./academy-login.component.scss']
})
export class AcademyLoginComponent implements OnInit {
  
  public loginForm: UntypedFormGroup;
  public hide = true;
  public returnUrl: string = '/academy';

  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public academyService: AcademyService,
    public appService: AppService
  ) { }

  ngOnInit(): void {
    // Obtener returnUrl de query params
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/academy';
    });

    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      this.academyService.login(values)
        .subscribe(
          (response: any) => {
            if (response.code === 200 && response.response && response.response.token) {
              // Guardar token (usar localStorage si rememberMe, sino sessionStorage)
              const storage = this.loginForm.get('rememberMe')?.value ? localStorage : sessionStorage;
              storage.setItem('academy_token', response.response.token);
              
              // Guardar información del estudiante
              if (response.response.student) {
                storage.setItem('academy_student', JSON.stringify(response.response.student));
              }

              this.router.navigate([this.returnUrl]);
            } else {
              this.appService.openAlertDialog('Error al iniciar sesión');
            }
          },
          (error: any) => {
            const message = error.status === 401 ? 'Email o contraseña incorrectos' : 'Ha ocurrido un error al iniciar sesión';
            this.appService.openAlertDialog(message);
          }
        );
    }
  }

  goToRegister(): void {
    this.router.navigate(['/academy/register'], { queryParams: { returnUrl: this.returnUrl } });
  }
}

