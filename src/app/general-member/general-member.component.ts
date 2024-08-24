import { ToastrService } from "ngx-toastr";
import { MemberPersonalInfoModel } from "./../model/memberPersonalInfo.model";
import { AuthService } from "./../service/auth.service";
import { Component, ElementRef, EventEmitter, OnInit, ViewChild ,ChangeDetectorRef } from "@angular/core";
import { WebsiteServiceService } from "../service/website-service.service";
import { SettingService } from "../service/settings/Setting.service";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AccountsLedgerModel } from "../model/accountsLedger.model";
import { BasicEntryModel, SocailMediaModel, allServiceSubHeadNameModel } from "../model/basicEntryModel";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpErrorResponse } from "@angular/common/http";
import { ReportModel } from "../Roports/report-select-list/ReportModel/ReportModel";

import { ReportService } from "../Roports/report-select-list/ReportModel/ReportService";


@Component({
  selector: "app-general-member",
  templateUrl: "./general-member.component.html",
  styleUrls: ["./general-member.component.css"],
})
export class GeneralMemberComponent implements OnInit {
  mobileNo: string;
  memberCode: string;
  AccountsLedgerInfo: AccountsLedgerModel[];
  moduleId: number = 46;
  compId: number;
  previewImg: string;
  selectedFile = new EventEmitter<any>();
  getFileOnChange = new EventEmitter<any>();
  // // serviceTypeSelector = new EventEmitter<any>(); 
  fieldId: string;
  isRequired: boolean = false;
  memberPersonalInfo: MemberPersonalInfoModel;
  memPersonalInfoForm: FormGroup;
  allServiceSubHeadNameArray:FormArray;
  comcod: number;
  branchId: number;
  userId: number =0;
  btnStatus = "Save";
  thanaList: any[] = [];
  genderList: any[] = [];
  bloodGroup: any[] = [];
  religionList: any[] = [];
  maritialList: any[] = [];
  locationList: any[] = [];
  departments: any[] = [];
  halls: any[] = [];
  transactionType: any[] = [
    {"id":1, "name":"Bank"},
    {"id":2, "name":"Bkash"},
    {"id":3, "name":"Nagad"},
    {"id":4, "name":"Rocket"},
  ];

  salaryHead:any [] = [];

  memPersonalInfoArray:FormArray;
  constructor(
    private webService: WebsiteServiceService,
    private formBuilder: FormBuilder,
    private settingSevice: SettingService,
    private toaster: ToastrService,
    public modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private reportService:ReportService,
    
  ) {
    this.allServiceSubHeadNameArray=this.formBuilder.array([]);
   }
  

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.memberCode = localStorage.getItem("memberCode");
    this.mobileNo = localStorage.getItem("mobile");
    this.createform();
    this.getAllThanaList();
   this.getMemberPersonalInfo();    
    this.getAllSalaryHead();
    this.getMemberPersonalInfo();
    this.getAccountsLedger();
    this.getAllGenderList();
    this.getAllBloodGroup();
    this.getAllReligion();
    this.getAllMaritalStatus();
    this.getAllLOcation(); 
    this.getAllDepartment();
   this.socialMediaGet(); 
     this.getAllHalls();
    this.getAllSalaryHead();
    this.socialMediaGet(); 
    this.cdr.detectChanges();
    this.filterServiceTypeID = 3;
  }

  getAccountsLedger() {
    this.webService
      .getAccountsLedger(this.compId, this.mobileNo)
      .subscribe((reasult: any) => {
        if (reasult) {
          this.AccountsLedgerInfo = reasult.result as AccountsLedgerModel[];
          console.log('AccountsLedgerInfo', reasult.result)
        } else {
        }
      });
  }

 
  getMemberPersonalInfo() { 
    this.webService
      .getPersonalInfoByMemberCode(this.memberCode, this.compId, 26)
      .subscribe((reasult: any) => {
        if (reasult.status) {
         this.memberPersonalInfo = reasult.result as MemberPersonalInfoModel;
          this.getAllThanaByThanaId(this.memberPersonalInfo.permanentThanaID);
          this.getAllPresentThanaByThanaId(this.memberPersonalInfo.thanaID);
         this.memPersonalInfoForm.patchValue(this.memberPersonalInfo);

          this.memPersonalInfoForm.patchValue({
            memberId:this.memberPersonalInfo.id
          })
          this.memPersonalInfoForm.patchValue({
            createdBy:this.memberPersonalInfo.userID
          })
        } else {
        }
      });
  }
  getAllThanaList() {
    this.settingSevice.getAllThanaList().subscribe((response: any) => {
      if (response.status) {
        this.thanaList = response.result;
      } else {
        this.thanaList = [];
      }
    });
  }
  getAllGenderList() {
    this.settingSevice.getAllGender().subscribe((response: any) => {
      if (response.status) {
        this.genderList = response.result;
      } else {
        this.genderList = [];
      }
    });
  }
  getAllBloodGroup() {
    this.settingSevice.getAllBloodGroup().subscribe((response: any) => {
      if (response.status) {
        this.bloodGroup = response.result;
      } else {
        this.bloodGroup = [];
      }
    });
  }
  getAllReligion() {
    this.settingSevice.getAllReligion().subscribe((response: any) => {
      if (response.status) {
        this.religionList = response.result;
      } else {
        this.religionList = [];
      }
    });
  }
  getAllMaritalStatus() {
    this.settingSevice.getAllMaritalStatus().subscribe((response: any) => {
      if (response.status) {
        this.maritialList = response.result;
      } else {
        this.maritialList = [];
      }
    });
  }
  getAllLOcation() {
    this.settingSevice.getAllLocation().subscribe((response: any) => {
      if (response.status) {
        this.locationList = response.result;
      } else {
        this.locationList = [];
      }
    });
  }
  onSelectPresentThana(thana: any) {
    if (thana == null) {
      this.memPersonalInfoForm.patchValue({
        thanaID: null,
        presentUpazila: null,
        presentDistrict: null,
      });
      return;
    }
    this.memPersonalInfoForm.patchValue({
      thanaID: thana.thanaID,
      presentUpazila: thana.upazilaName,
      presentDistrict: thana.districtName,
    });
  }
  onSelectPermanentThana(thana: any) {
    if (thana == null) {
      this.memPersonalInfoForm.patchValue({
        thanaID: null,
        permanetUpazila: null,
        permanetDistrict: null,
      });
      return;
    }
    this.memPersonalInfoForm.patchValue({
      permanentThanaID: thana.thanaID,
      permanetUpazila: thana.upazilaName,
      permanetDistrict: thana.districtName,
      isSameThana: 0,
    });
  }
  getAllPresentThanaByThanaId(thanaId: number) { 
    this.settingSevice
      .getAllThanaByThanaId(thanaId)
      .subscribe((response: any) => {
        if (response.status) {
          let thanaInfo = response.result;
          this.memPersonalInfoForm.patchValue({
            thanaID: thanaId,
            presentUpazila: thanaInfo.upazilaName,
            presentDistrict: thanaInfo.districtName,
          });
        }
      });
  }
  getAllThanaByThanaId(thanaId: number) { 
    this.settingSevice
      .getAllThanaByThanaId(thanaId)
      .subscribe((response: any) => {
        if (response.status) {
          let thanaInfo = response.result;
          this.memPersonalInfoForm.patchValue({
            permanentThanaID: thanaId,
            permanetUpazila: thanaInfo.upazilaName,
            permanetDistrict: thanaInfo.districtName,
          });
        }
      });
  }
  onSameSelect() {
    if (this.f.isSameThana.value) {
      this.getAllThanaByThanaId(this.f.thanaID.value);
    } else {
      this.memPersonalInfoForm.patchValue({
        permanentThanaID: null,
        permanetUpazila: null,
        permanetDistrict: null,
      });
    }
  }
  onSameAddressSelect() {
    if (this.f.allSame.value) {
      this.f.permanentAddress.patchValue(this.f.presentAddress.value);
    } else {
      this.memPersonalInfoForm.patchValue({
        permanentAddress: null,
      });
    }
  } 
c  

  UpdateMember() {
    this.webService
      .UpdateMemberInfo(this.memPersonalInfoForm.value)
      .subscribe((response: any) => {
        if (response.status) {
          this.toaster.success(response.isSaved, "Update Successfully");
        } else {
          this.toaster.error("Fail To Update");
        }
      });
  }

  getAllDepartment() {
    this.webService.getAllDepartment(this.compId).subscribe((result: any) => {
      if (result) {
        this.departments = result as BasicEntryModel[];
      } else {
        return;
      }
    });
  }
  getAllHalls() {
    this.webService.getAllHalls(this.compId).subscribe((result: any) => {
      if (result) {
        this.halls = result as BasicEntryModel[];
      } else {
        return;
      }
    });
  }

  onselectHall(data: any) {
    this.memPersonalInfoForm.patchValue({
      hallID: data.id,
    });
  }
  onselectDepartment(data: any) {
    this.memPersonalInfoForm.patchValue({
      departmentID: data.id,
    });
  }

  onSelectServiceTypeID(data: any) {
    this.memPersonalInfoForm.patchValue({
      serviceTypeID: data.id,
    });
  }


  modalServOpen(event: any) { 
    this.modalService.open(event, { size: "lg", windowClass: "my-class" });
  }
   
  SaveTransactionEntry() { 
let billPrepared=new MemberPersonalInfoModel();
       billPrepared=this.memPersonalInfoForm.value; 
      var filter=this.allServiceSubHeadNameArray.value;
      billPrepared.itemArray=filter;
    this.webService.transactionEntrySave(billPrepared).subscribe((response: any) => {
      if (response.status) {
        this.toaster.success("Save Successfully"); 
        alert("Save Successfully");
        this.modalService.dismissAll();
      } else {
        this.toaster.error(response.status, "Failed!")
      }
      
      this.reset();
    })
  } 

  sizeMessage:string= 'File size is required max 500 KB';
  pictureDesign(){  
    if(this.formVal.picture.size<500){  
         document.getElementById('sizeMessage').innerHTML='File size is required max 500 KB'  
         document.getElementById('sizeMessage').style.fontWeight = '500'
         document.getElementById('sizeMessage').classList.add('float-right')
         document.getElementById('sizeMessage').classList.add('p-1')
         document.getElementById('sizeMessage').classList.add('text-danger') 
         return
        }
      }

  createform() {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.memPersonalInfoForm = this.formBuilder.group({
      id: [0, []],
      memberCode: [, []],
      memberName: [, []],
      fathersName: [, []],
      mothersName: [, []],
      spousName: [, []],
      dateOfBirth: [, []],
      dateOfBirthNgb: [, []],
      genderID: [, []],
      bloodGroupID: [, []],
      religionID: [, []],
      maritialStatusID: [, []],
      mobileNo: [, []],
      email: [, []],
      countryID: [0, []],
      nationalityID: [, []],
      location: [, []],
      thanaID: [, []],
      permanentThanaID: [, []],
      postOffice: [0, []],
      presentAddress: [, []],
      permanentAddress: [, []],
      compId: [, []],
      moduleID: [this.moduleId, []],
      userID: [this.userId, []],
      remarks: [, []],
      picture: [, []],
      presentUpazila: [, []],
      presentDistrict: [, []],
      permanetUpazila: [, []],
      permanetDistrict: [, []],
      isSameThana: [, []],
      allSame: [, []],
      lastEducation: [, []],
      position: [, []],
      status: [1, []],
      departmentID: [, []],
      hallID: [, []],
      memberId: [, []],
      transactionTypeId:[,[]],
      amount:[,[]],
      transactionId:[,[]],
      serviceDateId:[,[]],
      date:[currentDate,[]],
      note:[,[]],
      createdBy:[,[]],
      approvedBy:[,[]],
      serviceTypeID:[,[]],
 
      subServiceName:[,[]],
      quenTity:[0,[]],
      unitPrice:[0,[]],
      totalPrice:[0,[]]
    });
  }

  getAllSalaryHead() {
    this.settingSevice.getAllSalaryHeadName(26,this.compId,1).subscribe((response: any) => {
      debugger
      if (response.status) {
        debugger
        this.salaryHead = response.result;

        
 
// Or update the contents of the existing array 

        console.log(this.salaryHead ,"head")
      } else {
        this.salaryHead = [];
      }
    })
  }
  onImageChange(files: FileList) {
    if (files.length == 0) {
      return null;
    }
    //Show image
    var readerForShow = new FileReader();
    readerForShow.onload = (event: any) => {
      this.previewImg = event.target.result;
    };
    readerForShow.readAsDataURL(files.item(0));
    //Convert image
    var readerForConvert = new FileReader();
    readerForConvert.onload = this._handleReaderLoaded.bind(this);
    readerForConvert.readAsBinaryString(files[0]);
    document.getElementById(this.fieldId).innerText = files[0].name;
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.previewImg = btoa(binaryString); // Converting file to binary string data.
    this.selectedFile.emit(btoa(binaryString)); // Converting file to binary string data.
  }
  onChangeFile(files: FileList) {
    if (files.length == 0) {
      return null;
    }
    var readerForShow = new FileReader();
    readerForShow.onload = (event: any) => {
      this.previewImg = event.target.result;
    };
    this.getFileOnChange.emit(files.item(0));
  }
  clearPicture() {
    this.previewImg = null;
    this.selectedFile.emit(null);
    document.getElementById(this.fieldId).innerText = "Choose file...";
  }
  get f() {
    return this.memPersonalInfoForm.controls;
  }

  get formVal() {
    return this.memPersonalInfoForm.value;
  }
  reset() {
    this.createform();

  }



  socialMedia:any;
  socialMediaGet(){ 
    this.settingSevice.socialMediaGet(this.compId).subscribe((result:any)=>{
      if(result){
      this.socialMedia=result.result as SocailMediaModel[];
      console.log('socialMedia',result.result)
      }
    })
   }

   isMemberInfoVisible:any;
   showMemberInfo() {
    this.isMemberInfoVisible = !this.isMemberInfoVisible;
  }
  allServiceSubHeadName: allServiceSubHeadNameModel[]; 
  getAllServiceSubHeadName() {
    this.settingSevice.getAllServiceSubHeadName(this.f.serviceDateId.value, this.compId).subscribe((response: any) => {
      if (response.status) { 
        response.result.forEach(item => {
          this.allServiceSubHeadNameArray.push(
            this.formBuilder.group({
              accountID: item.accountID,
              unitPrice: item.unitPrice,
              amount: item.amount,
              serviceID: item.serviceID,
              subServiceName: item.subServiceName,
              quentity: item.quentity,
              totalPrice: item.totalPrice   
            })
          );
        });

        console.log('a 2024 ', this.allServiceSubHeadNameArray)
      } else {
        console.error('Error retrieving data');
      }
    });
  
 
  }
    
  quentitycalculate(i){
 //const qty = this.f.quentity
 let qty=this.allServiceSubHeadNameArray.controls[i].get('quentity').value;
 let uprice=this.allServiceSubHeadNameArray.controls[i].get('unitPrice').value; 
  const amount=  uprice * qty
  this.allServiceSubHeadNameArray.controls[i].get('amount').patchValue(amount);
  let totalPrice=this.allServiceSubHeadNameArray.controls[i].patchValue('amount'); 

  this.memPersonalInfoForm.patchValue({
    totalPrice: amount,             
}); 
  }
  calculateTotalPrice(itemArray: FormGroup) {
    const unitPrice = itemArray.controls.unitPrice.value;
    const quantity = itemArray.controls.quentity.value;
    const totalPrice = unitPrice * quantity;
    itemArray.controls.totalPrice.setValue(totalPrice);
    this.memPersonalInfoForm.patchValue({
      amount: this.calculateTotalSum(),             
  }); 
  }

  calculateTotalSum(): number {
    let totalSum = 0;
    this.allServiceSubHeadNameArray.controls.forEach((itemArray: FormGroup) => {
      const totalPrice = itemArray.controls.totalPrice.value;
      totalSum += totalPrice ? parseFloat(totalPrice) : 0;  
    });
   
    return totalSum;
  }


  filterServiceTypeID:any=0;
   updateAmount(event: any) {   
    const selectedPurpose = event.id;  
    const filteredSalaryHead = this.salaryHead.filter(item => item.id == selectedPurpose);
    if (filteredSalaryHead[0].serviceTypeID != 4) {
        this.memPersonalInfoForm.patchValue({
            amount: filteredSalaryHead[0].amount,           
            filterServiceTypeID: 0  ,
        });         
    }  
    else {       
       this.memPersonalInfoForm.patchValue({
        amount:0
       })
        this.getAllServiceSubHeadName();
      this.filterServiceTypeID=4;      
    }
}
serviceTypeSelector :any; 
clicke(event:any){
  this.modalService.open(event,{ size: "lg", windowClass: "my-class" });
}
 

 
LedgerID: 0
AccounId: null
LedgerType: 1
And: 20240608
CompId: 202
BranchId: 29

isExporting: boolean = false;
onExportReport(reportModel: ReportModel) {
  debugger
  this.isExporting = true;
  this.reportService.getCommercialReportForRpt({
    ReportId: 1124
    ,ExportType: 'pdf'
    ,Between: '20240608'
    ,StartDate: '20240608'
    ,EndDate: '20240608'
    ,LedgerID: 0
    ,AccounId: null
    ,LedgerType: 1
    ,And: '20240608'
    ,CompId: 202
    ,BranchId: 29


    // // //ExportType: reportModel.exportType,    
    // // ExportType: 'pdf',    
    // // CompID: this.compId,
    // // ModuleID: this.moduleId,
    // // LocationId: 0,
    // // DetailsID: this.formVal.detailsId,
    // // //memberId: this.formVal.memberId,
    // // memberId: this.memberPersonalInfo.userID,
    // // CriteriaId: this.formVal.criteriaId,
    // // PeriodId: this.formVal.periodID,
    // // AcountID: this.formVal.accountId,
  }).subscribe((file) => { 
    debugger
    if (file) {
      debugger
      this.reportService.openFileWindow(file)
    }
  }, (err: HttpErrorResponse) => {
    this.isExporting = false;
    debugger
    this.toaster.error('An unexpected Error occured', 'Error')
  })
}

}