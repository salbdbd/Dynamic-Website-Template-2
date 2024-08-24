import { WebsiteServiceService } from './../service/website-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-recivable-member-list',
  templateUrl: './recivable-member-list.component.html',
  styleUrls: ['./recivable-member-list.component.css']
})
export class RecivableMemberListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private webService: WebsiteServiceService
  ) { }
  MemberReceivableListForm: FormGroup;
  compId: number;
  rtpReceivableMembers: any[] = [];
  moduleId: number;
  userId:any;
  ngOnInit() {
    this.userId=localStorage.getItem('userId');
    this.compId = AuthService.CompanyId;
    this.moduleId=AuthService.ModuleId;
    this.getAllMemberReceivableListReport();
  }
  onSelectMemberInfo(memList: any) {
    this.MemberReceivableListForm.patchValue({
      memberID: memList.id
    })
  }
  getAllMemberReceivableListReport() {
    if(this.userId==null){
      return;
    }
    this.webService.getReceivableMemberList(this.userId, this.moduleId, this.compId).subscribe((response: any) => {
      if (response.status) {
        this.rtpReceivableMembers = response.result;
      }
      else {
        this.rtpReceivableMembers = [];
      }
    })
  }
  reset() {
    this.MemberReceivableListForm.reset();
    this.rtpReceivableMembers = [];
  }
}
