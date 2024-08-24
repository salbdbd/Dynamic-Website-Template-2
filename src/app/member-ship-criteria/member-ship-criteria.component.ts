import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { WebsiteServiceService } from '../service/website-service.service';
import { FormBuilder } from '@angular/forms';
import { SettingService } from '../settings/Setting.service';
@Component({
  selector: 'app-member-ship-criteria',
  templateUrl: './member-ship-criteria.component.html',
  styleUrls: ['./member-ship-criteria.component.css']
})
export class MemberShipCriteriaComponent implements OnInit {

  constructor(
private websiteService:WebsiteServiceService, 
private formBuilder: FormBuilder,
private settingSevice: SettingService,
private toaster: ToastrService
  ) { }
compId:number;
moduleId:number;
  ngOnInit() {
    this.compId =AuthService.CompanyId;
    this.moduleId=AuthService.ModuleId;
    this.getMemberCriteria();
  }


  memberCriteriaView: any;
  getMemberCriteria(){
    this.websiteService.getMemberShipCriteria(this.compId,this.moduleId).subscribe((result:any) =>{
      if(result){
        debugger
        this.memberCriteriaView= result.result;
        console.log('MemberShipCriteria',result.result)
      }      
    })
  }

  

}
