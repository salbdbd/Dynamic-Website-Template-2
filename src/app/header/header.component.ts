import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebsiteServiceService } from '../service/website-service.service';
import { AuthService } from './../service/auth.service';
import { TopImageModel } from '../model/topImage.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  compId: number;
  moduleId: number;
  MainMenuCriteria: number;
  companyInfo: any[] = [];
  menuNames: any[] = [];
  companyName: string;
  image: any;
  allImage: TopImageModel[];
  top10: any;
  logo: TopImageModel[];
  constructor(
    private websiteService: WebsiteServiceService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private route: Router) { }
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.moduleId = AuthService.ModuleId;
    this.MainMenuCriteria = AuthService.MainMenuCriteria;
    this.getCompany();
    this.getMenuTree();
   this.allImages();
   console.clear();
   this.logohide();

  }
  getCompany() {
    this.websiteService.getCompany(this.compId).subscribe((response: any) => {
      if (response.status) {
        let companyInfo = response.result;
        this.companyName = companyInfo[0].name;
        this.image = companyInfo[0].logo;
      }
    })
  }
  allImages() {
    this.websiteService.getAllPicture(this.compId,3).subscribe((result: any) => {
      if (result) {
         //console.log("Image",result.result)

        this.allImage = (result.result as TopImageModel[])      
          .map(img => {
            img.extension = img.wPicture.split('.')[1];
            return img;
          });  

      }
    })
  }


  getMenuTree() {
    // console.log("Main Menu Criteria", this.moduleId, this.compId, this.MainMenuCriteria);
    this.websiteService.getMenuTree(this.moduleId, this.compId, this.MainMenuCriteria).subscribe((response: any) => {
      if (response.status) {
        this.menuNames = response.result;
       // console.log("Menu Tree", this.menuNames);
      }
    })
  }
  modalServiceOpen(event: any) {
    try {
      this.modalService.open(event)
    }
    catch (err) {
    }
  }
  onSelectMainMenu(mainMenu: any, event) {
    event.stopPropagation();
    if (mainMenu.isCommon == 1) {
      this.modalService.dismissAll();
      this.route.navigate(['common'], { queryParams: { menu: mainMenu.detailsID } })
    }
    else if (mainMenu.tag == 5 && mainMenu.criteriaID == 1) {
      this.modalService.dismissAll();
      this.route.navigate(['login'])
    }
    else if (mainMenu.tag == 4 && mainMenu.criteriaID == 1) {
      this.modalService.dismissAll();
      this.route.navigate(['contactInfo'])
    }
    // else if(mainMenu.tag == 6 && mainMenu.criteriaID==1){
    //   this.modalService.dismissAll();
    //   this.route.navigate(['pageInformation'])
    // }
    else if (mainMenu.tag == 2 && mainMenu.criteriaID == 1) {
      this.modalService.dismissAll();
      this.route.navigate(['newsEvents'])
    }
    else if (mainMenu.tag == 0 && mainMenu.detailsID == 10857) {
      // this.modalService.dismissAll();
      // this.route.navigate(['chairmanInfo'])
      this.modalService.dismissAll();
      this.route.navigate(['login'])
    }
    else if (mainMenu.tag == 0 && mainMenu.detailsID == 10860) {
      this.modalService.dismissAll();
      this.route.navigate(['newsEvents'])
    }

    else if (mainMenu.tag == 0 && mainMenu.detailsID == 16782) {
      this.modalService.dismissAll();
      this.route.navigate(['our-member-list'])
    }
    else if (mainMenu.tag == 0 && mainMenu.detailsID == 7290) {
      this.modalService.dismissAll();
      this.route.navigate(['about'])
    }
    else if (mainMenu.tag == 0 && mainMenu.detailsID == 10859) {
      this.modalService.dismissAll();
      this.route.navigate(['pageInformation'])
    }
    else if (mainMenu.tag == 0 && mainMenu.detailsID == 10863) {
      this.modalService.dismissAll();
      this.route.navigate(['compInfo'])
    }
    else if (mainMenu.tag == 1 && mainMenu.detailsID == 7252) {
      this.modalService.dismissAll();
      this.route.navigate([''])
    }
  }


  onSelectMenu(menu: any, event) {
    event.stopPropagation();
   // console.log("Menu", menu);
    if (menu.isCommon == 1) {
      this.modalService.dismissAll();
      this.route.navigate(['common'], { queryParams: { menu: menu.detailsID } })
    }
    else if (menu.detailsID == 7272) {
      this.modalService.dismissAll();
      this.route.navigate(['contentInfo'])
    }
    else if (menu.detailsID == 16782) {
      this.modalService.dismissAll();
      this.route.navigate(['our-member-list'])
    }

    else if (menu.detailsID == 7290) {
      this.modalService.dismissAll();
      this.route.navigate(['about'])
    }
    else if (menu.detailsID == 11366) {
      this.modalService.dismissAll();
      this.route.navigate(['committee'])
    }
    //For Mohona
    else if (menu.detailsID == 7275) {
      this.modalService.dismissAll();
      this.route.navigate(['committee'])
    }
    else if (menu.detailsID == 7260) {
      this.modalService.dismissAll();
      this.route.navigate(['our-product'])
    }
    else if (menu.detailsID == 16781) {
      this.modalService.dismissAll();
      this.route.navigate(['photo-gallery'])
    }
    else if (menu.detailsID == 16780) {
      this.modalService.dismissAll();
      this.route.navigate(['video'])
    }
    else if (menu.detailsID == 16777) {
      this.modalService.dismissAll();
      this.route.navigate(['member-entry-form'])
    }
    else if (menu.detailsID == 12050) {
      this.modalService.dismissAll();
      this.route.navigate(['member-entry-form'])
    }
    else if (menu.detailsID == 16778) {
      this.modalService.dismissAll();
      this.route.navigate(['member-ship-criteria'])
    }


    else
      if (menu.detailsID == 6141) {
        this.modalService.dismissAll();
        this.route.navigate(['notice'])
      }
      else if (menu.detailsID == 6143) {
        this.modalService.dismissAll();
        this.route.navigate(['compInfo'])
      }
      else if (menu.detailsID == 6144) {
        this.modalService.dismissAll();
        this.route.navigate(['chairmanInfo'])
      }

      else if (menu.detailsID == 13727) {
        this.modalService.dismissAll();
        this.route.navigate(['newsEvents'])
      }

  }
  onSelectSubMenu(subMenu, event) {
    event.stopPropagation();
   // console.log("Sub Menu", subMenu);
    if (subMenu.isCommon == 1) {
      this.modalService.dismissAll();
      this.route.navigate(['common'], { queryParams: { menu: subMenu.detailsID } })
    }
    else if (subMenu.detailsID == 20) {
      this.modalService.dismissAll();
      this.route.navigate(['login'])
    }
    else if (subMenu.detailsID == 19) {
      this.modalService.dismissAll();
      this.route.navigate(['recivableMemberList'])
    }
    else if (subMenu.detailsID == 19) {
      this.modalService.dismissAll();
      this.route.navigate(['recivableMemberList'])
    }
    else if (subMenu.detailsID == 23) {
      this.modalService.dismissAll();
      this.route.navigate(['pageInformation'])
    }
  }

 
     myFunction() { 
      var x = document.getElementById("myLinks");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
    

    logohide() { 
      var x = document.getElementById("Linksmenu");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "none";
      }
    }
    
   


   alertMessageWindow(){ 
    debugger
      var x = document.getElementById("messageFile");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "block";
        x.style.color = "red";
      }
    }

    alertMessageClose(){ 
      debugger
      var x = document.getElementById("messageFile");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "none";
        x.style.color = "red";
      }
      setInterval(this.alertMessageWindow,  20 * 30 * 1000);
    }
    
}
