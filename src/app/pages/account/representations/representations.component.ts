import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-representations',
  templateUrl: './representations.component.html',
  styleUrl: './representations.component.scss'
})
export class RepresentationsComponent implements OnInit{

  representations: any;
  email:any;
  firstname:any;
  lastname:any;
  address:any;
  document_number:any;

  constructor(public router:Router){}
  ngOnInit(): void {

  }

  registerRepresentation(){
    console.log("Go to register representation");
    this.router.navigate(['/account/representations/add-representation']);

  }

}