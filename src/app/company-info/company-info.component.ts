import { CompanyModel } from './../model/company.model';
import { Component, OnInit } from '@angular/core';
import { WebsiteServiceService } from '../service/website-service.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  compId:number;
  companyInfo:CompanyModel;
  constructor(
    private websiteService: WebsiteServiceService,
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getCompanyInfo();
  }
  getCompanyInfo(){
    this.websiteService.getCompInfo(this.compId).subscribe((response: any) => {
      if (response.status) {
    this.companyInfo=response.result as CompanyModel;
      }
    })
    }


}
