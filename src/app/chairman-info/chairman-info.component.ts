import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ChairmanInfoModel } from '../model/chairmanInfo.model';
import { WebsiteServiceService } from '../service/website-service.service';
import { CompanyModel } from '../model/company.model';

@Component({
  selector: 'app-chairman-info',
  templateUrl: './chairman-info.component.html',
  styleUrls: ['./chairman-info.component.css']
})
export class ChairmanInfoComponent implements OnInit {
compId:number;
chairmInfo:ChairmanInfoModel[];
infoForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private websiteService: WebsiteServiceService,
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.createForm();
    this.getChairmanInfo();
    this.getLocation();
  }
  getChairmanInfo(){
    this.websiteService.getChairmanInfo(this.compId).subscribe((response: any) => {
      if (response.status) {
    this.chairmInfo=response.result as ChairmanInfoModel[];
      }
    })
    }
    saveInfo(){
      this.websiteService.infoSave(this.infoForm.value).subscribe((response: any) => {
        if (response.status) {
        alert("Success");
        }
        else{
          alert("sorry");
        }
      })
    }
    getLocation(){
      this.websiteService.getMyLocation(222222).subscribe((response: any) => {
        if (response.status) {
      let info=response.result as any;
        }
      })
      }
    createForm(){
      this.infoForm=this.formBuilder.group({
        id:[,[]],
        iDNo:["sa12",[]],
        name:["test",[]],
        phoneNo:[1234,[]],
        address:["Dhaka",[]]
      })
    }

}
