import { Component, OnInit, Output } from '@angular/core';
import { NewsEventModel } from '../model/newsEvents.model';
import { WebsiteServiceService } from '../service/website-service.service';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-news-events',
  templateUrl: './news-events.component.html',
  styleUrls: ['./news-events.component.css']
})
export class NewsEventsComponent implements OnInit {
  compId: number;
  news: NewsEventModel[];
  events: NewsEventModel[];
  @Output() title='News Or Event'
  constructor(
    private websiteService: WebsiteServiceService,
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.getNews();
    this.getEvents();
  }
  getNews() {  
    this.websiteService.getNewsEventsByDate(this.compId, 1).subscribe((response: any) => { 
      if (response.status) {        
        this.news = response.result as NewsEventModel[];
        console.log('getNews',response.result)
      }
    })
  }
  getEvents() {
    this.websiteService.getNewsEventsByDate(this.compId, 2).subscribe((response: any) => {
      if (response.status) {
        this.events = response.result as NewsEventModel[];
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
    console.log('Event from modal:', event);
  }
}
