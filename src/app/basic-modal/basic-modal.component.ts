import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewsEventModel } from '../model/newsEvents.model'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import { WebsiteServiceService } from '../service/website-service.service';
 import { AuthService } from './../service/auth.service';
@Component({
  selector: 'app-basic-modal',
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.css']
})
export class BasicModalComponent implements OnInit {
  modalDat:any=0;
  compId:any;
  constructor(
    private modalService: NgbModal,
    private WebsiteService :WebsiteServiceService
  ) { }
  @Input() title : any;
  @Input() modalData:any;
  @Input() newsenvent :  NewsEventModel[]; 

  @Output() selectEvent = new EventEmitter<NewsEventModel>();
  ngOnInit() {
    this.getEvents();
    this.compId = AuthService.CompanyId; 
   
  }
 

  open(){ 
    this.modalService.dismissAll();
  }

  getEvents() {
    debugger
    this.WebsiteService.getNewsEventsByDate(this.modalData.compID, 10).subscribe((response: any) => {
      if (response.status) {
        this.newsenvent = response.result as NewsEventModel[];
      }
    }) 
  }
  receivedPicture: string;

   
  handleImageClick(picture: string) {
    this.receivedPicture = picture;
  }
  
  cancel() { 
   document.getElementById('modal-container').style.display = 'none';
  }
 
}
