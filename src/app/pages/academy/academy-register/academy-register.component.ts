import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { AppService } from '../../../app.service';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-academy-register',
  templateUrl: './academy-register.component.html',
  styleUrls: ['./academy-register.component.scss']
})
export class AcademyRegisterComponent implements OnInit {
  
  public registerForm: UntypedFormGroup | null = null;
  public hide = true;
  public hideConfirm = true;
  public returnUrl: string = '/academy';
  public oportunaliaUser: any = null;
  public checkingOportunalia = true;
  public emailDisabled = false;
  public showForm = false;

  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public academyService: AcademyService,
    public appService: AppService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    // Obtener returnUrl de query params
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/academy';
    });

    // Verificar si hay usuario de Oportunalia logueado
    this.checkOportunaliaUser();
  }

  checkOportunaliaUser(): void {
    const oportunaliaToken = this.userService.getToken();
    
    if (!oportunaliaToken) {
      // No hay usuario de Oportunalia, crear formulario normal
      this.createForm();
      this.checkingOportunalia = false;
      return;
    }

    // Verificar usuario de Oportunalia
    this.academyService.checkOportunaliaUser(oportunaliaToken).subscribe(
      (response: any) => {
        this.checkingOportunalia = false;
        
        if (response.code === 200 && response.response && response.response.user) {
          this.oportunaliaUser = response.response.user;
          
          // Si ya está registrado, redirigir directamente sin mostrar formulario
          if (response.response.already_registered && response.response.token) {
            // Guardar token y redirigir automáticamente
            localStorage.setItem('academy_token', response.response.token);
            if (response.response.student) {
              localStorage.setItem('academy_student', JSON.stringify(response.response.student));
            }
            this.router.navigate([this.returnUrl]);
            return;
          }
          
          // Si no está registrado, mostrar confirmación y hacer auto-registro
          this.autoRegisterFromOportunalia();
        } else {
          // No hay usuario de Oportunalia, crear formulario normal
          this.createForm();
        }
      },
      (error: any) => {
        // Error al verificar, crear formulario normal
        this.checkingOportunalia = false;
        this.createForm();
      }
    );
  }

  autoRegisterFromOportunalia(): void {
    const oportunaliaToken = this.userService.getToken();
    
    if (!oportunaliaToken || !this.oportunaliaUser) {
      // Si no hay token o usuario, mostrar formulario normal
      this.showForm = true;
      this.createForm();
      return;
    }

    // NO crear formulario, solo mostrar confirmación
    // Mostrar mensaje de confirmación y hacer auto-registro
    const dialogRef = this.appService.openConfirmDialog(
      'Registro en Academia',
      `Se utilizarán tus datos de Oportunalia (${this.oportunaliaUser.email}) para acceder a la academia. ¿Deseas continuar?`
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Usuario acepta, hacer auto-registro
        this.academyService.autoRegister(oportunaliaToken).subscribe(
          (response: any) => {
            if (response.code === 200 && response.response && response.response.token) {
              // Guardar token y redirigir
              localStorage.setItem('academy_token', response.response.token);
              if (response.response.student) {
                localStorage.setItem('academy_student', JSON.stringify(response.response.student));
              }
              this.appService.openAlertDialog('Bienvenido a la academia. Se han utilizado tus datos de Oportunalia.');
              this.router.navigate([this.returnUrl]);
            } else {
              const message = response.messages?.join(', ') || 'Error al registrarse';
              this.appService.openAlertDialog(message);
              // Si falla, redirigir a la página principal de academia
              this.router.navigate(['/academy']);
            }
          },
          (error: any) => {
            const message = error.error?.messages?.join(', ') || 'Ha ocurrido un error al registrarse';
            this.appService.openAlertDialog(message);
            // Si falla, redirigir a la página principal de academia
            this.router.navigate(['/academy']);
          }
        );
      } else {
        // Usuario cancela, redirigir a la página principal de academia (NO mostrar formulario)
        this.router.navigate(['/academy']);
      }
    });
  }

  createForm(useOportunaliaData: boolean = false): void {
    const formData: any = {
      email: [null, Validators.compose([Validators.required, Validators.email])],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: [null, Validators.compose([Validators.required])],
    };

    if (useOportunaliaData && this.oportunaliaUser) {
      formData.email = [this.oportunaliaUser.email, Validators.compose([Validators.required, Validators.email])];
      formData.firstname = [this.oportunaliaUser.firstname, Validators.compose([Validators.required])];
      formData.lastname = [this.oportunaliaUser.lastname, Validators.compose([Validators.required])];
      this.emailDisabled = true;
    }

    this.registerForm = this.fb.group(formData, { validators: this.passwordMatchValidator });
    this.showForm = true;
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
      // Si hay usuario de Oportunalia, forzar uso de su email
      const oportunaliaToken = this.userService.getToken();
      
      if (oportunaliaToken && this.oportunaliaUser) {
        // Forzar el email de Oportunalia
        this.registerForm.patchValue({ email: this.oportunaliaUser.email });
      }
      
      // Hacer registro normal
      this.doRegister();
    }
  }

  private doRegister(): void {
    // Preparar datos para envío
    const formData: any = {
      email: this.registerForm.get('email')?.value,
      firstname: this.registerForm.get('firstname')?.value,
      lastname: this.registerForm.get('lastname')?.value,
      password: this.registerForm.get('password')?.value,
    };

    // Si hay token de Oportunalia, incluirlo en el header
    const oportunaliaToken = this.userService.getToken();

    this.academyService.register(formData, oportunaliaToken || undefined)
      .subscribe(
        (response: any) => {
          if (response.code === 200 && response.response && response.response.token) {
            // Guardar token y redirigir
            localStorage.setItem('academy_token', response.response.token);
            if (response.response.student) {
              localStorage.setItem('academy_student', JSON.stringify(response.response.student));
            }
            this.appService.openAlertDialog('Registro exitoso. Bienvenido a la academia.');
            this.router.navigate([this.returnUrl]);
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

  goToLogin(): void {
    this.router.navigate(['/academy/login'], { queryParams: { returnUrl: this.returnUrl } });
  }
}

