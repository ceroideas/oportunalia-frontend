import { Component } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verificar-cuenta',
  templateUrl: './verificar-cuenta.component.html',
  styleUrls: ['./verificar-cuenta.component.scss']
})
export class VerificarCuentaComponent {
  isLoaded: boolean = false;
  success: boolean = false;

  constructor (private userService: UserService, private route: ActivatedRoute) {}  

  ngOninit() {

    const token = this.route.snapshot.paramMap.get('token');
    this.userService.verifyAccount(token).subscribe(data => {
      
      if (data.code === 200) {

        this.success = true;
        this.isLoaded = true;
      } 

    }, (_) => this.success = true);
    
  }
}
