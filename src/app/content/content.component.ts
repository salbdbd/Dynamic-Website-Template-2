import { CompanyModel } from './../model/company.model';
import { CompanyInfoComponent } from './../company-info/company-info.component';
import { WebsiteServiceService } from './../service/website-service.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
compId:number
Companymessage:CompanyModel[]
  constructor(
    private webService:WebsiteServiceService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getCompInfo();
  }

  getCompInfo(){
    this.webService.getCompInfo(this.compId).subscribe((reasult:any)=>{
    if(reasult){
     this.Companymessage=reasult.result as CompanyModel[];
     console.log(this.Companymessage);
    }
    })
  }
}
