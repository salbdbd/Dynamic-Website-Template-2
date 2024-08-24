import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cotact-info',
  templateUrl: './cotact-info.component.html',
  styleUrls: ['./cotact-info.component.css']
})
export class CotactInfoComponent implements OnInit {

  constructor() { }
  loginForm:FormGroup;
  ligin:FormGroup;
  ngOnInit() {
  }
login(){
  
}
}
