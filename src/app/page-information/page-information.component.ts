import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { PageInfoModel } from '../model/pageInfo.model';
import { WebsiteServiceService } from '../service/website-service.service';

@Component({
  selector: 'app-page-information',
  templateUrl: './page-information.component.html',
  styleUrls: ['./page-information.component.css']
})
export class PageInformationComponent implements OnInit {
  PageInfo:PageInfoModel[];
  compId:number;
  constructor(
    private webSerive:WebsiteServiceService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getPageInfo();
  }
  getPageInfo(){
this.webSerive.getMenuPageInfo(this.compId,22).subscribe((result:any)=>{
  if(result){
    this.PageInfo=result.result as PageInfoModel[];
  }
})
  }

}
