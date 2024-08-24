import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { WebsiteServiceService } from '../service/website-service.service'; 
import { MemberPersonalInfoModel } from '../model/memberPersonalInfo.model';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-our-member-list',
  templateUrl: './our-member-list.component.html',
  styleUrls: ['./our-member-list.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('3s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-in', style({ transform: 'translateX(0)' }))
      ])
    ]), 
    
    trigger('slideRight', [
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('1s ease-in', style({ transform: 'translateX(0)' }))
      ]),
      transition('* => void', [
        animate('1s ease-out', style({ transform: 'translateX(100%)' }))
      ]),
      transition('* <=> *', [
        animate('1s ease-in-out')
      ])
    ])
  ],
})
export class OurMemberListComponent implements OnInit {
  fadeIn = true;  
  slideIn = true;  
  allmembertype :any;
  allmemberList :MemberPersonalInfoModel[];
  filtermemberlist :MemberPersonalInfoModel[];
  constructor(
    private websiteService:WebsiteServiceService
  ) { }
compId: number;
moduleId:number;
//set of value
pageId=20246;
  ngOnInit() {
    this.compId =AuthService.CompanyId;
    this.moduleId=AuthService.ModuleId; 
    this.getAllmemberType();
    this.getAllmemberList();
   
  }


 

  memberTypeLength:any;
  getAllmemberType(){ 

    this.websiteService.getAllmemberList(this.compId,0,this.pageId).subscribe((response: any) => {
      if (response.status) {
    this.allmembertype=response.result as MemberPersonalInfoModel;
    console.log('type',response.result)
  
      this.memberTypeLength =response.result.length;      
        
      }
    })
    }

getAllmemberList(){ 
  this.websiteService.getAllmemberList(this.compId,26,0).subscribe((response: any) => {
    if (response.status) {
      this.filtermemberlist=response.result  ;
      this.allmemberList=response.result ;
    }
  })
  }
  open(parentID:number){
    this.websiteService.getAllmemberList(this.compId,26,parentID).subscribe((response: any) => {
      if (response.status) {
    this.filtermemberlist=response.result  ;
    this.allmemberList=response.result ;
      }
    })
  }


  onFilter(event) {
    const inputValue = event.target.value.trim().toLowerCase();
  
    if (inputValue) {
      this.filtermemberlist = this.allmemberList.filter(
        item => item.memberCode.toLowerCase().includes(inputValue) ||
          item.memberName.toLowerCase().includes(inputValue)
      );
     
    }    
    else {
      this.filtermemberlist = this.allmemberList;
    }
  }
  
}
