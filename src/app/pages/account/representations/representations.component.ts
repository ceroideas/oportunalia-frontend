import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor(){}
  ngOnInit(): void {

  }

  registerRepresentation(){
    console.log("Go to register representation");
  }

}
