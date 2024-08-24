import { AuthService } from './../service/auth.service';
import { WebsiteServiceService } from './../service/website-service.service';
import { Component, OnInit } from '@angular/core';
import { CommitteeModel } from '../model/committee.model';

@Component({
  selector: 'app-committee',
  templateUrl: './committee.component.html',
  styleUrls: ['./committee.component.css']
})
export class CommitteeComponent implements OnInit {
  compId: number
  committee: CommitteeModel[]
  committeeSingle: CommitteeModel[]
  constructor(
    private webService: WebsiteServiceService
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.committeeCheirman() ;
    this.committeeMember();
  }
  committeeMember() {
    this.webService.getAllCommitteeMember(this.compId).subscribe((reasult: any) => {
      if (reasult) {
        this.committee = reasult.result as CommitteeModel[];
        console.log("committe",this.committee);
      }
    })
  }
  committeeCheirman() {
    this.webService.getAllCommitteeMember(this.compId+10000).subscribe((reasult: any) => {
      if (reasult) {
        this.committeeSingle = reasult.result as CommitteeModel[];
        
      }
    })
  }

}
