import { UserModel } from './../model/user.model';
import { WebsiteServiceService } from './../service/website-service.service';
import { AuthService } from './../service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
btnStatus:string='Save';
registrationForm:FormGroup;
compId:number;
moduleId:number;
users:UserModel;
  constructor(
    private formBuilder:FormBuilder,
    private toaster:ToastrService,
    private webService:WebsiteServiceService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.ModuleId;
    this.createForm();
  }
createForm(){
  this.registrationForm=this.formBuilder.group({
    id:[,[]],
    loginId:[,[]],
    memberCode:[,[]],
    mobile:[,[]],
    password:[,[]],
    compId:[this.compId,[]],
    userId:[10,[]],
    moduleId:[this.moduleId,[]],
    userType:[0,[]],
  })
}
getMemberByCode(){
  this.webService.getMemberByCode(this.registrationForm.controls.memberCode.value,this.compId).subscribe((reasult:any)=>{
    if(reasult.status){
    this.users=reasult.result as UserModel;
    this.registrationForm.patchValue(this.users);
    this.btnStatus='Update';
    }
    else{
      this.toaster.error("No Data Found");
    }
    })
}
registration(){
this.webService.registration(this.registrationForm.value).subscribe((reasult:any)=>{
if(reasult){
this.toaster.success("Save Successfully");
this.btnStatus='Save';
}
else{
  this.toaster.error("Fail To Save");
}
})
}
updateregistration(){
  this.webService.updateRegistration(this.registrationForm.value).subscribe((reasult:any)=>{
  if(reasult){
  this.toaster.success("Update Successfully");
  this.btnStatus='Save';
  }
  else{
    this.toaster.error("Fail To Update");
  }
  })
  }
  saveUpdate(){
  if(this.btnStatus=='Save'){
  this.registration();
  }
  else{
this.updateregistration();
  }
  }
reset(){
  this.createForm();
}
}
