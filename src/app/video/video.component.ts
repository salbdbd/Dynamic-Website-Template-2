import { Component, OnInit } from '@angular/core';
import { VideoFileModel } from '../model/newsEvents.model';
import { AuthService } from '../service/auth.service';
import { WebsiteServiceService } from '../service/website-service.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit { 
    compId: number;
    videolist: VideoFileModel[];  
    constructor(
      private websiteService: WebsiteServiceService,
    ) { }
    moduleId:any;
    ngOnInit() {
      this.compId = AuthService.CompanyId;
      this.moduleId=AuthService.ModuleId
      this.videoFile(); 
     
    }
    videoFile() {  
      this.websiteService.videoFileList(this.compId, this.moduleId).subscribe((response: any) => { 
        debugger
        if (response.status) {        
          this.videolist = response.result;  
          this.selectVideo(this.videolist[0])
        }
      })
    }
    autorunVideoFile:any=1;
    modifydatef2:any='';
    modifydates2:any='';
    selectVideo(item){ 
      debugger      
      this.autorunVideoFile=1 
      this.autorunVideoFile= item.wVideoFile
      this.modifydatef2=item.modifiedDate.substring(0, 8);      
     this.modifydates2=item.modifiedDate.substring(10,15);
    const video = document.getElementById('preview') as HTMLVideoElement;      
    video.src = 'data:video/mp4;base64,' + item.wVideoFile;     
    video.play();
    }
 

  }
   
  
