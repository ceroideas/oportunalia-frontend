import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PublicService } from 'src/app/api/public.service';
import { AppService } from '../../../app.service';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})
export class InterestsComponent implements OnInit{

  public interestForm:UntypedFormGroup;
  provinceList: any;
  userData:any;
  formatLabel(value: number): string {
    /* if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    } */

    return `${value}`;
  }

  constructor(public fb: UntypedFormBuilder, public userService: UserService, public appService: AppService, public snackBar: MatSnackBar,private publicService: PublicService){}

  ngOnInit() {
    this.getProvinceList();
    this.interestForm = this.fb.group({

      viviendas: [false],
      trasteros: [false],
      aplicaciones_informaticas: [false],
      solares: [false],
      unidades_productivas: [false],
      otros: [false],
      naves_industriales: [false],
      locales: [false],
      derechos_cobro_creditos: [false],
      vehiculos: [false],
      oficinas: [false],
      garajes: [false],
      lotes_mobiliario: [false],
      maquinaria: [false],
      obras_arte_antiguedades: [false],
      rusticas: [false],
      ubicacion: null,
      inversion: null,
      presupuesto: null,
      activos: null,

    });

    this.userService.getUserData().subscribe(({ response }) => {
      this.userData = response;
      let interests = this.userData.interests;

      console.log(interests);

      if (interests) {
        this.interestForm.patchValue({
          viviendas: interests.viviendas,
          trasteros: interests.trasteros,
          aplicaciones_informaticas: interests.aplicaciones_informaticas,
          solares: interests.solares,
          unidades_productivas: interests.unidades_productivas,
          otros: interests.otros,
          naves_industriales: interests.naves_industriales,
          locales: interests.locales,
          derechos_cobro_creditos: interests.derechos_cobro_creditos,
          vehiculos: interests.vehiculos,
          oficinas: interests.oficinas,
          garajes: interests.garajes,
          lotes_mobiliario: interests.lotes_mobiliario,
          maquinaria: interests.maquinaria,
          obras_arte_antiguedades: interests.obras_arte_antiguedades,
          rusticas: interests.rusticas,
          ubicacion: interests.ubicacion,
          inversion: interests.inversion,
          presupuesto: interests.presupuesto,
          activos: interests.activos,
        });
      }
    });

  }


  public onInterestFormSubmit(values:Object):void {
    if (this.interestForm.valid) {
      console.log(values)

      this.appService.saveInterests(values).subscribe(data=>{
        console.log('guardado');
        this.snackBar.open('Tu información se ha almacenado correctamente!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })

    }
  }

  getProvinceList(){
    this.publicService.provinceList(1)
      .subscribe(
        (response) => {
          this.provinceList = response.response;
        },
        (error) => {

        }
      )
  }

  updateInterest(){
    console.log("Update interest");

  }
}
