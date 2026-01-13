import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { AppService } from '../../../app.service';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-academy-login',
  templateUrl: './academy-login.component.html',
  styleUrls: ['./academy-login.component.scss']
})
export class AcademyLoginComponent implements OnInit {
  
  public loginForm: UntypedFormGroup | null = null;
  public hide = true;
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
    // Pequeño delay para asegurar que el componente esté completamente inicializado
    setTimeout(() => {
      this.checkOportunaliaUser();
    }, 100);
  }

  checkOportunaliaUser(): void {
    let oportunaliaToken = this.userService.getToken();
    
    // getToken() ya limpia el "Bearer ", pero por si acaso lo verificamos de nuevo
    if (oportunaliaToken && oportunaliaToken.startsWith('Bearer ')) {
      oportunaliaToken = oportunaliaToken.replace(/^Bearer\s+/i, '');
      // Guardar el token limpio
      localStorage.setItem('token', oportunaliaToken);
    }
    
    console.log('🔍 Verificando usuario de Oportunalia...', { 
      hasToken: !!oportunaliaToken, 
      tokenLength: oportunaliaToken?.length,
      tokenPreview: oportunaliaToken ? oportunaliaToken.substring(0, 20) + '...' : null
    });
    
    if (!oportunaliaToken) {
      // No hay usuario de Oportunalia, crear formulario normal
      console.log('❌ No hay token de Oportunalia, mostrando formulario normal');
      this.createForm();
      this.checkingOportunalia = false;
      return;
    }

    // Verificar usuario de Oportunalia
    this.academyService.checkOportunaliaUser(oportunaliaToken).subscribe(
      (response: any) => {
        console.log('✅ Respuesta de checkOportunaliaUser:', response);
        this.checkingOportunalia = false;
        
        if (response && response.code === 200 && response.response) {
          // Verificar si hay usuario en la respuesta
          if (response.response.user) {
            this.oportunaliaUser = response.response.user;
            console.log('👤 Usuario de Oportunalia encontrado:', this.oportunaliaUser);
            
            // Si ya está registrado, hacer login automático sin mostrar formulario
            if (response.response.already_registered && response.response.token) {
              console.log('✅ Usuario ya registrado en academia, acceso directo');
              // Guardar token y redirigir automáticamente
              const storage = localStorage;
              storage.setItem('academy_token', response.response.token);
              if (response.response.student) {
                storage.setItem('academy_student', JSON.stringify(response.response.student));
              }
              // Acceso directo sin mostrar formulario
              this.router.navigate([this.returnUrl]);
              return;
            }
            
            // Si no está registrado, hacer auto-registro automático
            console.log('🔄 Usuario no registrado en academia, iniciando auto-registro');
            this.autoRegisterFromOportunalia();
            return;
          }
        }
        
        // Si no hay usuario en la respuesta, mostrar formulario normal
        console.log('⚠️ No se encontró usuario en la respuesta, mostrando formulario');
        this.createForm();
      },
      (error: any) => {
        // Error al verificar, crear formulario normal
        console.error('❌ Error al verificar usuario de Oportunalia:', error);
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
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    };

    if (useOportunaliaData && this.oportunaliaUser) {
      formData.email = [this.oportunaliaUser.email, Validators.compose([Validators.required, Validators.email])];
      this.emailDisabled = true;
    }

    this.loginForm = this.fb.group(formData);
    this.showForm = true;
  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      // Si hay usuario de Oportunalia y no está registrado, intentar auto-registro primero
      const oportunaliaToken = this.userService.getToken();
      
      if (oportunaliaToken && this.oportunaliaUser && !this.oportunaliaUser.already_registered) {
        // Intentar auto-registro automático
        this.academyService.autoRegister(oportunaliaToken).subscribe(
          (response: any) => {
            if (response.code === 200 && response.response && response.response.token) {
              // Guardar token y redirigir
              const storage = this.loginForm.get('rememberMe')?.value ? localStorage : sessionStorage;
              storage.setItem('academy_token', response.response.token);
              if (response.response.student) {
                storage.setItem('academy_student', JSON.stringify(response.response.student));
              }
              this.appService.openAlertDialog('Registro exitoso. Bienvenido a la academia.');
              this.router.navigate([this.returnUrl]);
            } else {
              // Si falla auto-registro, intentar login normal
              this.doLogin();
            }
          },
          (error: any) => {
            // Si falla auto-registro, intentar login normal
            this.doLogin();
          }
        );
      } else {
        // Login normal
        this.doLogin();
      }
    }
  }

  private doLogin(): void {
    const loginData = this.loginForm.value;
    const oportunaliaToken = this.userService.getToken();

    this.academyService.login(loginData, oportunaliaToken || undefined)
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

  goToRegister(): void {
    this.router.navigate(['/academy/register'], { queryParams: { returnUrl: this.returnUrl } });
  }
}

