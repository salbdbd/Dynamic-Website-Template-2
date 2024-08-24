import { UserModel } from './../model/user.model';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsiteServiceService } from '../service/website-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  compId: number
  moduleId: number;
  loginForm: FormGroup
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
    this.loginForm = this.formBuilder.group({
      mobile: [, [Validators.required]],
      password: [, [Validators.required]]
    })
  }
  login() { 
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.toaster.warning("Fill Required Fields");
      return;
    }
    else {
      this.webService.login(
        this.loginForm.controls.mobile.value,
        this.loginForm.controls.password.value,
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
    return this.loginForm.controls;
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
