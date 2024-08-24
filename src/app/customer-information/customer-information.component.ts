import { AccountsLedgerModel } from './../model/accountsLedger.model';
import { Component, OnInit } from '@angular/core';
import { MemberPersonalInfoModel } from '../model/memberPersonalInfo.model';
import { AuthService } from '../service/auth.service';
import { WebsiteServiceService } from '../service/website-service.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent implements OnInit {
  mobileNo: string;
  compId: number;
  memberPersonalInfo: MemberPersonalInfoModel
  AccountsLedgerInfo: AccountsLedgerModel[]
  constructor(
    private webService: WebsiteServiceService,
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.mobileNo = localStorage.getItem('mobile');
    this.getMemberPersonalInfo();
    this.getAccountsLedger();
  }
  getMemberPersonalInfo() {
    this.webService.getPersonalInfoBycompIdMobileNo(this.compId,this.mobileNo).subscribe((reasult: any) => {
      if (reasult) {
        this.memberPersonalInfo = reasult.result as MemberPersonalInfoModel;
      }
      else {
      }
    })
  }
  getAccountsLedger() {
    this.webService.getAccountsLedger(this.compId,this.mobileNo).subscribe((reasult: any) => {
      if (reasult) {
        this.AccountsLedgerInfo = reasult.result as AccountsLedgerModel[];
      }
      else {
      }
    })
  }

}
