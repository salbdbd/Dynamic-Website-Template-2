import { AuthService } from './../service/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { WebsiteServiceService } from '../service/website-service.service';
import { TopImageModel } from '../model/topImage.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ChairmanInfoModel } from '../model/chairmanInfo.model';
import { NoticeModel } from '../model/notice.model';
import { CompModel } from '../model/comp.model';
import { CompanyAboutModel, NewsEventModel, WebsiteHeading } from '../model/newsEvents.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-in', style({ transform: 'translateX(0)' }))
      ])
    ]),

    trigger('slideRight1', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
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
export class BodyComponent implements OnInit {

  fadeIn = true;  
  slideIn = true; 
  slideRight: string;

  @HostListener('mouseover')
  onMouseOver() {
    this.slideRight = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.slideRight = '';
  } 

  compId: number;
  moduleId: number;
  company:CompModel[];
  MainMenuCriteria: number;
  allImage: TopImageModel[];
  chairmInfo:ChairmanInfoModel[];
  notice:NoticeModel[];
  news:NewsEventModel[];
  events:NewsEventModel[];
  title:any;
  constructor(private websiteService: WebsiteServiceService, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.moduleId = AuthService.ModuleId;
    this.MainMenuCriteria = AuthService.ModuleId;
    this.topImages();
    this.getCompany();
    this.getChairmanInfo();
    this.getNotice();
    this.getNews();
    this.getEvents();
    this.getHeadLine();
    this.companyAbout();
  }

  topImages() {
    this.websiteService.getAllTopPicture(this.compId).subscribe((result: any) => {
      if (result) {
      //   console.log("Image",result.result)

        this.allImage = (result.result as TopImageModel[])

          .map(img => {
            img.extension = img.wPicture.split('.')[1];
            return img;
          });

      }
    })
  }



  getCompany() {
    this.websiteService.getCompany(this.compId).subscribe((response: any) => {
      if (response.status) {
        this.company = response.result as CompModel[];
      }
    })
  }
  getChairmanInfo(){
    this.websiteService.getChairmanInfo(this.compId).subscribe((response: any) => {
      if (response.status) {
    this.chairmInfo=response.result as ChairmanInfoModel[];
   // console.log("Chairmen",this.chairmInfo);
      }
    })
    }
    getNotice(){
      this.websiteService.getNotice(this.compId).subscribe((reasult:any)=>{
        if(reasult){
        this.notice=reasult.result as NoticeModel[];
        console.log('notice page', reasult.result);
        }
      })
     }

     getNews(){
      this.websiteService.getNewsEventsByDate(this.compId,1).subscribe((response: any) => {
        if (response.status) {
      this.news=response.result as NewsEventModel[];
        }
      })
      }
      getEvents(){
        this.websiteService.getNewsEventsByDate(this.compId,2).subscribe((response: any) => {
          if (response.status) {
        this.events=response.result as NewsEventModel[];
          }
        })
      }
      headLine:any;
      getHeadLine(){
        this.websiteService.getHeadLine(this.compId,2).subscribe((result:any)=>{
          if(result){
          this.headLine=result.result as WebsiteHeading[];
        //  console.log('HeadLine',result.result)
          }
        })
       }
   
    passnews:NewsEventModel[];

    showBasicModal = false;
    createNewItem(pussnews: any){
      this.passnews= pussnews as NewsEventModel[];
      // Toggle the visibility of the modal
      this.showBasicModal = !this.showBasicModal;
  
    }
  
    getNewss(event: any) { 
      // Handle the event emitted by the modal if needed
    //  console.log('Event from modal:', event);
    }


    aboutUs:any;
    companyAbout() { 
      debugger
      this.websiteService.companyAboutInfo(this.compId,3).subscribe((result: any) => {
        if (result) { 
          this.aboutUs = (result.result as CompanyAboutModel[])
          console.log('result', result.result);           
        }
      })
    }
  }