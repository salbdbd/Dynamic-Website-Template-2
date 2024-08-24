import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { WebsiteServiceService } from '../service/website-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  @Input() email:number;
  compId: number
  moduleId: number;
  forgerForm: FormGroup
  isSubmitted = false;
  status: boolean;
  memberInfo:UserModel;
  fieldTextType: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private webService: WebsiteServiceService,
    private modalService: NgbModal,
    private route: Router
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.moduleId=AuthService.ModuleId;
    this.createForm();
  }
  open(modal) {
    this.modalService.open(modal, { size: 'xl' })
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  createForm() {
    this.forgerForm = this.formBuilder.group({
      passwordConform: [, [Validators.required]],
      password: [, [Validators.required]],
      otpvalue: [, [Validators.required]],
      email: [this.email, [Validators.required]]
    })
  }

  changeConform() { 
    debugger
    this.isSubmitted = true;
    if (this.forgerForm.invalid) {
      this.toaster.warning("Fill Required Fields");
      return;
    }
    else {
      this.webService.login(
        this.forgerForm.controls.mobile.value,
        this.forgerForm.controls.password.value,
        this.compId,
        this.moduleId
      ).subscribe((user: any) => {
        if (user) {
          this.status = true;
          this.memberInfo=user.result as UserModel;
          localStorage.setItem('userId',this.memberInfo.userId.toString());
             localStorage.setItem('memberCode',this.memberInfo.memberCode);
             localStorage.setItem('mobile',this.memberInfo.mobile.toString());
             localStorage.setItem('moduleId',this.moduleId.toString());
             localStorage.setItem('compId',this.compId.toString());
             this.toaster.success("Successfully Login");
             if(this.memberInfo.userType==4){
              this.modalService.dismissAll();
             this.route.navigate(['generalMember'])
             }
             else{
              this.modalService.dismissAll();
              this.route.navigate(['customerInfo'])
             }
        }
        else {
          this.status = false;
          this.toaster.error("UserId Password Wrong");
        }
      })
    }
  }
  registration(){
    this.modalService.dismissAll();
    this.route.navigate(['registration'])
  }
  get f() {
    return this.forgerForm.controls;
  }

  modalServiceOpen(event: any) {
    try {
      this.modalService.open(event)
      //this.modalService.open(LoginComponent)
    }
    catch (err) {
    }
  }



  showForgetPassword: boolean = false;
  LoginPage: boolean = true;

  toggleForgetPassword() {
    this.showForgetPassword = !this.showForgetPassword;
    this.LoginPage= !this.LoginPage;
  }

}