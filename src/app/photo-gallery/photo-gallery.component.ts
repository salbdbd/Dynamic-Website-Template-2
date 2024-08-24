import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { WebsiteServiceService } from '../service/website-service.service';
import { AuthService } from '../service/auth.service';
import { TopImageModel } from '../model/topImage.model';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  [x: string]: any;
compId:number;
  allImage: TopImageModel[]; 
  intervalDuration = 100;  

  pictureForm: FormGroup;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel; 
  constructor(private websiteService:WebsiteServiceService) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId; 
    this.allImages()
  }
  ngAfterViewInit() { 
    this.startCarouselInterval();
  }

  startCarouselInterval() { 
    setInterval(() => {
      //this.carousel.next();
    }, this.intervalDuration);
  }
   allImages() {
    this.websiteService.getAllPicture(this.compId,2).subscribe((result: any) => {
      if (result) {
         console.log("Image",result.result)

        this.allImage = (result.result as TopImageModel[])      
          .map(img => {
            img.extension = img.wPicture.split('.')[1];
            return img;
          }); 
       //   this.topten = this.allImage.slice(0, 10); 

      }
    })
    
  }

 

createform(){
        this.pictureForm =this.formBuilder.group({
         id:[0,[]] 
    })
  }
   clicks:number = 0;
  
  clickNext(event:any){ 
    this.websiteService.getAllPicture(this.compId,2).subscribe((result: any) => {
      if (result) {  
         this.allImage = (result.result as TopImageModel[])      
          .map(img => {
            img.extension = img.wPicture.split('.')[1];
            return img;
          }); 
        //  this.old=this.clicks;
         // this.clicks += 5;
         // this.new=this.clciks;
        //  this.topten = this.allImage.slice(this.old,this.new);  
         
      }
    })
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {  
  }
  
  clickPrev(event:any){
    this.websiteService.getAllPicture(this.compId,2).subscribe((result: any) => {
      if (result) {
         console.log("Image",result.result)

        this.allImage = (result.result as TopImageModel[])      
          .map(img => {
            img.extension = img.wPicture.split('.')[1];
            return img;
          });  
           
          this.unloadHandler(event);
         // this.topten = this.allImage.slice(0,5); 
      }
    })
  }
}
