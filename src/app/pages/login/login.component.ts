import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';
import { AppService } from 'src/app/app.service';
import { AcademyService } from 'src/app/api/academy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public hide = true;
  constructor(
    public fb: UntypedFormBuilder,
    public router: Router,
    public userService: UserService,
    public appService: AppService,
    public academyService: AcademyService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      rememberMe: false
    });
  }

  public onLoginFormSubmit(values:Object):void {

    if (this.loginForm.valid) {
      this.userService.login(values)
        .subscribe(({ response }) => {
          this.userService.setAuthToken(response.token);
          
          // Verificar y vincular automáticamente con la academia si existe
          this.linkWithAcademy(response.token);
          
          this.router.navigate(['/account/profile']);
        },
        (e) => this.appService.openAlertDialog(e.status === 401 ? 'Error de credenciales' : 'Ha ocurrido un error'));
    }
  }

  private linkWithAcademy(oportunaliaToken: string): void {
    // Verificar si el usuario existe en la academia
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
          // Si no está registrado, no hacer nada (se registrará cuando acceda a la academia)
        }
      },
      (error: any) => {
        // Error al verificar, no hacer nada (no es crítico)
        console.log('No se pudo verificar vinculación con academia:', error);
      }
    );
  }
}
