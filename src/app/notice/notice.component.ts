import { WebsiteServiceService } from './../service/website-service.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NoticeModel } from '../model/notice.model';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
notice:NoticeModel[]
compId:number
  constructor(
    private webService:WebsiteServiceService
  ) { }

  ngOnInit() {
  this.compId=AuthService.CompanyId;
  this.getNotice();
  }
  getNotice(){
   this.webService.getNotice(this.compId).subscribe((reasult:any)=>{
     if(reasult){
     this.notice=reasult.result as NoticeModel[];
     console.log(this.notice);
     }
   })
  }

}
