import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { WebsiteServiceService } from '../service/website-service.service';
import { AuthService } from '../service/auth.service';
import { CompanyAboutModel } from '../model/newsEvents.model';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  compId: number;
  moduleId: number;
  CompanyAboutModel :CompanyAboutModel[];
  constructor(
    private formBuilder:FormBuilder,
    private websiteService: WebsiteServiceService,
    private toastr:ToastrService,
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.moduleId = AuthService.ModuleId; 
    this.companyAboutInfo();
  }
  companyDetails:any;

  companyAboutInfo() { 
    debugger
    this.websiteService.companyAboutInfo(this.compId,1).subscribe((result: any) => {
      if (result) { 
        this.companyDetails = (result.result as CompanyAboutModel[])
        console.log('result', result.result);           
      }
    })
    this.companyAboutpicture()
  }

  companypicture:any;
  companyAboutpicture() { 
    debugger
    this.websiteService.companyAboutInfo(this.compId,3).subscribe((result: any) => {
      if (result) { 
        this.companypicture = (result.result as CompanyAboutModel[])
        console.log('result', result.result);           
      }
    })
  }
}
