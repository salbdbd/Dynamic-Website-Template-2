import { ToastrService } from "ngx-toastr";
import { MemberPersonalInfoModel } from "./../model/memberPersonalInfo.model";
import { AuthService } from "./../service/auth.service";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { WebsiteServiceService } from "../service/website-service.service";
import { SettingService } from "../service/settings/Setting.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AccountsLedgerModel } from "../model/accountsLedger.model";
import { BasicEntryModel } from "../model/basicEntryModel";

@Component({
  selector: "app-member-entry-form",
  templateUrl: "./member-entry-form.component.html",
  styleUrls: ["./member-entry-form.component.css"],
})
export class MemberEntryFormComponent implements OnInit {
  mobileNo: string;
  memberCode: string;
  AccountsLedgerInfo: AccountsLedgerModel[];
  moduleId: number = 46;
  compId: number=AuthService.CompanyId;
  previewImg: string;
  selectedFile = new EventEmitter<any>();
  getFileOnChange = new EventEmitter<any>();
  fieldId: string;
  isRequired: boolean = false;
  memberPersonalInfo: MemberPersonalInfoModel;
  memPersonalInfoForm: FormGroup;
  comcod: number;
  branchId: number;
  userId: number = 0;
  // btnStatus = "Save";
  thanaList: any[] = [];
  genderList: any[] = [];
  bloodGroup: any[] = [];
  religionList: any[] = [];
  maritialList: any[] = [];
  locationList: any[] = [];
  departments: any[] = [];
  halls: any[] = [];

  constructor(

    private webService: WebsiteServiceService,
    private formBuilder: FormBuilder,
    private settingSevice: SettingService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.memberCode = localStorage.getItem("memberCode");
    this.mobileNo = localStorage.getItem("mobile");
    this.createform();
    this.getAllThanaList();
    this.getAllGenderList();
    this.getAllBloodGroup();
    this.getAllReligion();
    this.getAllMaritalStatus();
    this.getAllLocation();
    this.getAccountsLedger();
    this.getAllDepartment();
    this.getAllHalls();

  }


  getAccountsLedger() {
    this.webService
      .getAccountsLedger(this.compId, this.mobileNo)
      .subscribe((reasult: any) => {
        if (reasult) {
          this.AccountsLedgerInfo = reasult.result as AccountsLedgerModel[];
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
  getAllLocation() {
    this.settingSevice.getAllLocation().subscribe((response: any) => {
      if (response.status) {
        this.locationList = response.result as any[];
        console.log(this.locationList,"location")
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

  getAllDepartment() {
    this.webService.getAllDepartment(this.compId).subscribe((result: any) => {
      if (result) {
        this.departments = result as BasicEntryModel[];
        // console.log(this.departments, "result");
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

  saveMember() {
    if (this.memPersonalInfoForm.invalid) {
      this.toaster.error("Please fill the all required fields", "Invalid submission");
      return;
    }
    this.settingSevice.saveMemberInfo(this.memPersonalInfoForm.value).subscribe((response: any) => {
      if (response.status) {
        this.toaster.success("Save Successfully");
      } else {
        this.toaster.error(response.status, "Failed!")
      }
      this.reset();
    })
  }
  createform() {
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
      compId: [this.compId, []],
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
    });
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

  get formVal(){
    return this.memPersonalInfoForm.value
  }
  reset() {
    this.createform();
  }
}
