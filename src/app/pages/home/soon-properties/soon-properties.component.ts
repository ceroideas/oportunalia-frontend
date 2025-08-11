import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-soon-properties',
  templateUrl: './soon-properties.component.html',
  styleUrl: './soon-properties.component.scss'
})
export class SoonPropertiesComponent implements OnInit {
  @Input('properties') soonProperties;
  constructor() { }

  ngOnInit() {
  }

}
