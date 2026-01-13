import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-academy-register',
  templateUrl: './academy-register.component.html',
  styleUrls: ['./academy-register.component.scss']
})
export class AcademyRegisterComponent implements OnInit {
  
  public registerForm: UntypedFormGroup;
  public hide = true;
  public hideConfirm = true;
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

    this.registerForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [null, Validators.compose([Validators.required])],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: UntypedFormGroup) {
    const password = group.get('password');
    const passwordConfirm = group.get('password_confirmation');
    
    if (!password || !passwordConfirm) {
      return null;
    }
    
    return password.value === passwordConfirm.value ? null : { passwordMismatch: true };
  }

  public onRegisterFormSubmit(values: Object): void {
    if (this.registerForm.valid) {
      // Preparar datos para envío
      const formData = {
        email: this.registerForm.get('email')?.value,
        firstname: this.registerForm.get('firstname')?.value,
        lastname: this.registerForm.get('lastname')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.academyService.register(formData)
        .subscribe(
          (response: any) => {
            if (response.code === 200) {
              this.appService.openAlertDialog('Registro exitoso. Por favor, inicia sesión.');
              this.router.navigate(['/academy/login'], { queryParams: { returnUrl: this.returnUrl } });
            } else {
              const message = response.messages?.join(', ') || 'Error al registrarse';
              this.appService.openAlertDialog(message);
            }
          },
          (error: any) => {
            const message = error.error?.messages?.join(', ') || 'Ha ocurrido un error al registrarse';
            this.appService.openAlertDialog(message);
          }
        );
    }
  }

  goToLogin(): void {
    this.router.navigate(['/academy/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}

