import { Component, OnInit } from '@angular/core';
import { ChairmanInfoModel } from '../model/chairmanInfo.model';
import { CompModel } from '../model/comp.model';
import { NoticeModel } from '../model/notice.model';
import { AuthService } from '../service/auth.service';
import { WebsiteServiceService } from '../service/website-service.service';
import { SocailMediaModel } from '../model/socailMedia.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  compId: number;
  company:CompModel[];
  companyInformation:any;
  constructor(
    private websiteService: WebsiteServiceService,

  ) { let pos = document.documentElement;

pos.addEventListener("mousemove", (e: MouseEvent) => {
  pos.style.setProperty("--x", e.clientX + "px");
  pos.style.setProperty("--y", e.clientY + "px");
});}

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.getCompany();
    this.getCompanyInformation();
    this.socialMediaGet();
  }

  getCompany() { 
    this.websiteService.getCompany(this.compId).subscribe((response: any) => {
      if (response.status) {
        this.company = response.result as CompModel[]; 
      }
    })
  }

  getCompanyInformation() { 
    this.websiteService.getCompanyInformation(this.compId).subscribe((response: any) => {
      if (response.status) {
        this.companyInformation = response.result as CompModel[];
        console.log('companyinfo',response.result)
      }
    })
  }


  socialMedia:any;
  socialMediaGet(){ 
    this.websiteService.socialMediaGet(this.compId).subscribe((result:any)=>{
      if(result){
      this.socialMedia=result.result as SocailMediaModel[];
      console.log('socialMedia',result.result)
      }
    })
   }
 
socialmedia:any
   Facebook:any;
   onSelectSocial(event) {
    this.reset();
    this.websiteService.socialMediaGetsinge(this.compId, event).subscribe((result:any)=>{
      if(result){
      this.socialMedia=result.result as SocailMediaModel[];
     }
    })
   }
  

reset(){
    this.socialMedia = null; // Reset to null or whatever appropriate for your scenario
  
}
}