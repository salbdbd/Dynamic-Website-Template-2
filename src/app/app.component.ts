import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { WebsiteServiceService } from './service/website-service.service';
import { CompModel } from './model/comp.model';
import { TopImageModel } from './model/topImage.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'firstWebsite';
  companyInformation:any;
  compId:number;
  constructor ( private websiteService:WebsiteServiceService ){}
  ngOnInit(): void {
    this.compId=AuthService.CompanyId;
    this.getCompanyInformation() ;
    this.allImages();
   
  }
getCompanyInformation() {   
    this.websiteService.getCompanyInformation(this.compId).subscribe((response: any) => {
      if (response.status) {
        this.companyInformation = response.result as CompModel[];
        console.log('akter'); 
      }
    })
  }
  allImage:any;
  allImages() {  
    this.websiteService.getAllPicture(this.compId,3).subscribe((result: any) => {
      if (result) {
        // console.log("Image202400",result.result)

        this.allImage = (result.result as TopImageModel[])      
          .map(img => {
            img.extension = img.wPicture.split('.')[1];
            return img;
          });  
          
      }
    })
  }

 
}
