import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-representations',
  templateUrl: './representations.component.html',
  styleUrl: './representations.component.scss'
})
export class RepresentationsComponent implements OnInit{

  representations: any[];
  email:any;
  firstname:any;
  lastname:any;
  address:any;
  document_number:any;

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getRepresentations().subscribe(({ response }) => {
      this.representations = response;
    });
  }

  registerRepresentation(){
    console.log("Go to register representation");
    this.router.navigate(['/account/representations/add-representation']);

  }

}