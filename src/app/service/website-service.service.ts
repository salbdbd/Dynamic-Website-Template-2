import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { InfoModel } from "./../model/Info.model";
import { UserModel } from "./../model/user.model";
@Injectable({
  providedIn: "root",
})
export class WebsiteServiceService {
  constructor(private http: HttpClient) { }
  getCompany(id: number = -1) { 
    return this.http.get(environment.apiUrl + "/settings/getCompanyInformation/" + id);
  }
  getMenuTree(moduleId: number, compId: number, criteriaID: number) {
    return this.http.get(
      environment.apiUrl +
      // "/criteriaCenter/getCriteriaCeneter/moduleId/" +
      "/criteriaCenter/GetWebsiteCriteriaCenter/moduleId/" +
      moduleId +
      "/ComId/" +
      compId +
      "/criteriaID/" +
      criteriaID
    );
  }
  getAllTopPicture(comId: number) {
    var param = new HttpParams().set("comId", comId.toString());
    return this.http.get(
      environment.apiUrl + "/WebsiteSetup/GetAllTopPicture",
      { params: param }
    );
  }

  getAllDesignatinAssignByMember(comId: number) {
    return this.http.get(
      environment.apiUrl +
      "/websiteBasicEntry/getAllDesignationAssignByMember/" +
      comId
    );
  }
  login(mobile: string, password: string, compId: number, moduleId: number) { 
    var param = new HttpParams()
      .set("mobile", mobile)
      .set("password", password)
      .set("compId", compId.toString())
      .set("moduleId", moduleId.toString());
    return this.http.get(environment.apiUrl + "/User/Login", { params: param });
  }
  getReceivableMemberList(memberId: number, moduleId: number, compId: number) {
    return this.http.get(
      environment.apiUrl +
      "/receiptAndPayment/GetMemeberReceiablelist/memberId/" +
      memberId +
      "/moduleId/" +
      moduleId +
      "/compId/" +
      compId
    );
  }

  getMenuPageInfo(CompId: number, DetailsId: number) {
    var param = new HttpParams()
      .set("CompId", CompId.toString())
      .set("DetailsId", DetailsId.toString());
    return this.http.get(environment.apiUrl + "/WebsiteSetup/GetMenuPageInfo", {
      params: param,
    });
  }
  registration(userModel: UserModel) {
    return this.http.post(environment.apiUrl + "/User/Registration", userModel);
  }
  updateRegistration(userModel: UserModel) {
    return this.http.post(
      environment.apiUrl + "/User/UpdateRegistration",
      userModel
    );
  }
  getMemberByCode(memberCode: string, compId: number) {
    var param = new HttpParams()
      .set("memberCode", memberCode)
      .set("compId", compId.toString());
    return this.http.get(
      environment.apiUrl + "/User/GetRegistrationByMemberCode",
      { params: param }
    );
  }
  getPersonalInfoByMemberCode(
    memberCode: string,
    compId: number,
    moduleId: number
  ) {
    var param = new HttpParams()
      .set("memberCode", memberCode)
      .set("compId", compId.toString())
      .set("moduleId", moduleId.toString());
    return this.http.get(
      environment.apiUrl + "/User/GetMemberPersonalInformationWebsite",
      { params: param }
    );
  }
  getPersonalInfoBycompIdMobileNo(compId: number, mobile: string) {
    var param = new HttpParams()
      .set("compId", compId.toString())
      .set("mobile", mobile);
    return this.http.get(
      environment.apiUrl + "/User/GetPersonalInformationByCompIdMobileNo",
      { params: param }
    );
  }
  getAccountsLedger(compId: number, mobile: string) {
    var param = new HttpParams()
      .set("compId", compId.toString())
      .set("mobile", mobile);
    return this.http.get(environment.apiUrl + "/User/GetAccountsLedger", {
      params: param,
    });
  }
  getNewsEventsByDate(compId: number, type: number) { 
    var param = new HttpParams()
      .set("compId", compId.toString())
      .set("type", type.toString());
    return this.http.get(
      environment.apiUrl + "/WebsiteSetup/GetNewsEvenetByDate",
      { params: param }
    );
  }
  getNotice(compId: number) {
    var param = new HttpParams().set("compId", compId.toString());
    return this.http.get(environment.apiUrl + "/WebsiteSetup/GetNotice", {
      params: param,
    });
  }
  getChairmanInfo(compId: number) {
    var param = new HttpParams().set("compId", compId.toString());
    return this.http.get(
      environment.apiUrl + "/WebsiteSetup/GetChairmanInfoByCompId",
      { params: param }
    );
  }
  getAllCommitteeMember(compId: number) {
    var param = new HttpParams().set("compId", compId.toString());
    return this.http.get(
      environment.apiUrl + "/WebsiteSetup/GetAllCommitteeMember",
      { params: param }
    );
  }
  getCompInfo(compId: number) {
    var param = new HttpParams().set("compId", compId.toString());
    return this.http.get(
      environment.apiUrl + "/WebsiteSetup/GetCompanyInfoByCompId",
      { params: param }
    );
  }
  getMyLocation(mobileNo: number) {
    var param = new HttpParams().set("mobileNo", mobileNo.toString());
    return this.http.get(environment.apiUrl + "/WebsiteSetup/GetMyLocation", {
      params: param,
    });
  }
  infoSave(userModel: InfoModel) {
    return this.http.post(
      environment.apiUrl + "/WebsiteSetup/SaveMyInfo",
      userModel
    );
  }

  transactionEntrySave(itemArray: any) {
    return this.http.post(
      environment.apiUrl + "/WebsiteSetup/SaveTransactionEntry", itemArray
    );
  }
  UpdateMemberInfo(memInfo: any) {
    return this.http.post(
      environment.apiUrl + "/memberPersonalInfo/saveMenberPersonalInfo",
      memInfo
    );
  }

  getAllDepartment(compId: number) {
    var param = new HttpParams().set("compId", compId.toString());
    return this.http.get(environment.apiUrl + "/WebsiteSetup/getAllDepartment", {
      params: param,
    });
  }
  getAllHalls(compId: number) {
    var param = new HttpParams().set("compId", compId.toString());
    return this.http.get(environment.apiUrl + "/WebsiteSetup/getAllHall", {
      params: param,
    });
  }
  getCommonMenuDetails(detailsId: number, compId: number) {
    var param = new HttpParams().set("detailsId", detailsId.toString()).set("compID", compId.toString());
    return this.http.get(environment.apiUrl + "/WebsiteSetup/GetMenuPageInfo", {
      params: param,
    });
  }

  getAllProduct(comId: number) { 
    var param = new HttpParams().set("comId", comId.toString());
    return this.http.get(
      environment.apiUrl + "/WebsiteSetup/GetAllProduct",
      { params: param }
    );
  }

  getAllPicture(comId: number, type:number) { 
    var param = new HttpParams()
    .set("comId", comId.toString())
    .set("type", type.toString());
    return this.http.get(
      environment.apiUrl + "/WebsiteSetup/GetAllPicture",
      { params: param }
    );
  }
  getHeadLine(compId: number,moduleID:number) {
    var param = new HttpParams()
    .set("compId", compId.toString())
    .set("moduleID",moduleID.toString())
    return this.http.get(environment.apiUrl + "/WebsiteSetup/getHeadLine", {
      params: param,
    });
  }
  getCompanyInformation(id: number = -1) {
    return this.http.get(environment.apiUrl + "/settings/getCompanyInformation/" + id);
  }

  getAllmemberList(compId:number, moduleId:number, detailId:number){ 

   return this.http.get(
    environment.apiUrl +
    "/WebsiteSetup/getAllmemberList/CompId/" +
    compId +
    "/ModuleId/" +
    moduleId + "/DetailId/"+detailId
  );
  }

  socialMediaGet(compId: number) {
    var param = new HttpParams()
    .set("compId", compId.toString())
    return this.http.get(environment.apiUrl + "/WebsiteSetup/socialMediaLiskGet", {
      params: param,
    });
  }  
  
  companyAboutInfo(compId:number,type:number){ 
    var param=new HttpParams()
    .set('compId',compId.toString())
    .set('type',type.toString())
    return this.http.get(environment.apiUrl+'/websiteSetup/companyAboutInfo/',{params:param});
   }
   
  socialMediaGetsinge(compId: number,socialName:any) { 
    var param = new HttpParams()
    .set("compId", compId.toString())
    .set("socialName", socialName.toString())
    return this.http.get(environment.apiUrl + "/WebsiteSetup/socialMediaGetsinge", {
      params: param,
    });
  } 
  videoFileList(compId: number, moduleId: number) { 
    var param = new HttpParams()
      .set("compId", compId.toString())
      .set("moduleId", moduleId.toString());
    return this.http.get(environment.apiUrl + "/WebsiteSetup/getvideoFileList",
      { params: param }
    );
  }

  getMemberShipCriteria(compId:number,moduleId:number){
 var paramiter = new HttpParams()
 .set('compId', compId.toString())
 .set('moduleId', moduleId.toString());
return this.http.get(environment.apiUrl + "/WebsiteSetup/getMemberShipCriteria",{params:paramiter});   
 
}

}