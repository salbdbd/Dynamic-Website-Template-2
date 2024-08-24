import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageInfoModel } from 'src/app/model/pageInfo.model';
import { AuthService } from '../../service/auth.service';
import { WebsiteServiceService } from './../../service/website-service.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  receivedData: any;
  menuDetails: PageInfoModel[] = [];
  constructor(
    private websiteService: WebsiteServiceService,
    public route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.receivedData = params;
    });
  }

  ngOnInit() {
    console.log('common component ngon init called')
    // this.route.queryParams.subscribe((params) => {
    //   this.receivedData = params;
    // });
    this.route.queryParams.subscribe((params) => {
      this.websiteService.getCommonMenuDetails(this.receivedData.menu, AuthService.CompanyId).subscribe((response: any) => {
        if (response.status) {
          this.menuDetails = response.result;
        }
      })
    });
  }

}
