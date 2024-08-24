
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberPersonalInfoModel } from 'src/app/model/memberPersonalInfo.model';
 import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private http: HttpClient
  ) { }
  /*Basic Item get(Gender,BloodGroup,MaritialStatus)*/
  getAllBasicItem(tableName: string) {
    return this.http.get(environment.apiUrl + '/settings/GetAllBasicItems/tableName/' + tableName)
  }
  getAllGender() {
    return this.http.get(environment.apiUrl + '/settings/GetAllGender')
  }
  getAllBloodGroup() {
    return this.http.get(environment.apiUrl + '/settings/GetAllBloodGroup')
  }
  getAllReligion() {
    return this.http.get(environment.apiUrl + '/settings/GetAllReligion')
  }
  getAllMaritalStatus() {
    return this.http.get(environment.apiUrl + '/settings/GetAllMaritalStatus')
  }
  /*All Thana list*/
  getAllThanaList() {
    return this.http.get(environment.apiUrl + '/settings/GetAllThana')
  }
  getAllLocation() {
    return this.http.get(environment.apiUrl + '/settings/GetAllLocation')
  }
  getAllThanaByThanaId(thanaId: number) {
    return this.http.get(environment.apiUrl + '/settings/getThanaByThanaId/' + thanaId)
  }
  /* #region  Year */
  getAllYearType(id: number = 0) {
    return this.http.get(environment.apiUrl + '/settings/getAllYearType/' + id)
  }
  getAllYear(compId: number, yearType: number, id: number = 0) {
    return this.http.get(environment.apiUrl + '/settings/getAllYear/compId/' + compId + '/yearType/' + yearType + '/id/' + id)
  }

  saveMemberInfo(memInfo:MemberPersonalInfoModel){
    return this.http.post(environment.apiUrl+'/memberPersonalInfo/saveMenberPersonalInfoWeb',memInfo);
   }

  /* #endregion */

  /* #region  Branch */
  getAllBranch(compId: number, id: number = -1) {
    return this.http.get(environment.apiUrl + '/settings/getAllBranch/compId/' + compId + '/id/' + id)
  }
  getAllBranchByID(id: number) {
    return this.http.get(environment.apiUrl + '')
  }

  /* #endregion */

  /* #region  Company */
  getAllBusinessType() {
    return this.http.get(environment.apiUrl + '/settings/getAllBusinessType')
  }
  getAllCompany(id: number = -1) {
    return this.http.get(environment.apiUrl + '/settings/getCompany/' + id);
  }


  getCompIdName(clintId: number, compId: number, branchId: number) {
    var param = new HttpParams()
      .set('clintId', clintId.toString())
      .set('compId', compId.toString())
      .set('branchId', branchId.toString())
    console.log(param);
    return this.http.get(environment.apiUrl + '/Settings/GetCompanyIdName/', { params: param })
  }
  /* #endregion */

  /* #region  User */
  getAllUserType() {
    return this.http.get(environment.apiUrl + '/settings/getAllUserType')
  }


  getUsers(userType, clientId = -1, compId = -1, userId = -1, status = -1) {
    return this.http.get(environment.apiUrl + `/settings/GetUsers/${userType}/${clientId}/${compId}/${userId}/${status}`)
  }

  login(userCredential) {
    return this.http.post(environment.apiUrl + '/settings/Login', userCredential)
  }
  /* #endregion */

  /* #region  App Settings */
  saveAppModule(module) {
    return this.http.post(environment.apiUrl + '/settings/SaveorUpdateAppModule', module);
  }
  getAppModule(id: number = 0, loadAsTree = true) {
    return this.http.get(environment.apiUrl + `/settings/GetAppModule/${id}/${loadAsTree}`);
  }
  GetAssignedModule(companyId) {
    return this.http.get(environment.apiUrl + '/settings/GetAssignedModule/' + companyId);
  }
  getAppModuleByParentId(parentModuleId?: number) {
    return this.http.get(environment.apiUrl + '/settings/GetAppModuleByParentID/' + parentModuleId);
  }
  deleteAppModule(id: number) {
    return this.http.delete(environment.apiUrl + '/settings/DeleteModule' + id);
  }
  saveAppPage(page) {
    return this.http.post(environment.apiUrl + '/settings/SaveorUpdateAppPage', page);
  }
  getAppPage(id: number = 0) {
    return this.http.get(environment.apiUrl + '/settings/GetAppPage/' + id);
  }
  deleteAppPage(id: number) {
    return this.http.delete(environment.apiUrl + '/settings/DeletePage/' + id);
  }
  /* #endregion */

  /* #region  Assign */
  assignCompany(assignedCompany) {
    return this.http.post(environment.apiUrl + '/settings/AssignCompany', assignedCompany);
  }
  assignBranch(assignedBranch) {
    return this.http.post(environment.apiUrl + '/settings/AssignBranch', assignedBranch);
  }
  assignModule(companyModules: any[]) {
    return this.http.post(environment.apiUrl + '/settings/AssignModule', companyModules);
  }
  assignPage(requestParam) {
    return this.http.post(environment.apiUrl + '/settings/AssignPage', requestParam);
  }
  getAssignedCompaniesForEdit(userId: number) {
    return this.http.get(environment.apiUrl + `/settings/GetAssignedCompaniesForEdit/${userId}`)
  }
  getAssignedBranchesForEdit(userId: number, companyId: number) {
    return this.http.get(environment.apiUrl + `/settings/GetAssignedBranchesForEdit/${userId}/${companyId}`)
  }
  getAssignedBranches(userId: number, companyId: number) {
    return this.http.get(environment.apiUrl + `/settings/GetAssignedBranches/${userId}/${companyId}`)
  }
  getModulesWithUserPrivilege(userId: number, companyId: number, moduleId = -1) {
    return this.http.get(environment.apiUrl + `/settings/GetModulesWithUserPrivilege/${userId}/${companyId}/${moduleId}`)
  }
  getPageAuthInfo(userId, pageId) {
    return this.http.get(environment.apiUrl + `/settings/GetPageAuthInfo/${userId}/${pageId}`)
  }
  getModuleAuthInfo(compId, moduleId) {
    return this.http.get(environment.apiUrl + `/settings/GetModuleAuthInfo/${compId}/${moduleId}`)
  }
  /* #endregion */

  /* #region  Backup database */
  backupDatabase() {
    return this.http.get(environment.apiUrl + '/settings/BackupDb');
  }

  downloadBackupFile(filePath) {
    return this.http.get(environment.apiUrl + `/settings/GetDbBackupFile/${filePath}`);
  }
  checkTodaysBackup() {
    return this.http.get(environment.apiUrl + '/settings/CheckTodaysBackup');
  }
  /* #endregion */

  /* #region  Year-Month */
  getAllMonth() {
    return this.http.get(environment.apiUrl + '/settings/GetAllMonth')
  }
  getAllYearByType(compId: number, yearType: number) {
    let paramObj = new HttpParams()
      .set('compId', compId.toString())
      .set('yearType', yearType.toString());
    return this.http.get(environment.apiUrl + '/settings/GetAllYearByType/', { params: paramObj })
  }
  getMonthByID(id: number) {
    let paramObj = new HttpParams()
      .set('id', id.toString())
    return this.http.get(environment.apiUrl + '/settings/getMonthByID/', { params: paramObj })
  }
  getYearByID(id: number) {
    let paramObj = new HttpParams()
      .set('id', id.toString())
    return this.http.get(environment.apiUrl + '/settings/getYearByID/', { params: paramObj })
  }
  /* #endregion */

  /* #region  Period */
  // savePeriod(period: PeriodModel) {
  //   return this.http.post(environment.apiUrl + '/BasicEnty/SavePeriod', period)
  // }
  // getAllPeriod(compId: number, moduleId: number) {
  //   let paramObj = new HttpParams()
  //       .set('id',id.toString())
  //   return this.http.get(environment.apiUrl+'/settings/getYearByID/',{params:paramObj})
  //   }
  /* #Period */

  getAllPeriod(compId: number, moduleId: number) {
    let paramObj = new HttpParams()
      .set('compId', compId.toString())
      .set('moduleId', moduleId.toString())
    return this.http.get(environment.apiUrl + '/BasicEnty/GeAllPeriod', { params: paramObj })
  }
  periodGetById(id: number) {
    let paramObj = new HttpParams()
      .set('id', id.toString())
    return this.http.get(environment.apiUrl + '/BasicEnty/PeriodGetById/', { params: paramObj })
  }
  /*Member  Search */
  getAllMemberByModuleCompany(moduleId: number, compId: number) {
    let paramObj = new HttpParams()
      .set('moduleId', moduleId.toString())
      .set('compId', compId.toString())
    return this.http.get(environment.apiUrl + '/EmpGenInfo/getAllMemberListByModuleCompany/', { params: paramObj })
  }
  employmentGetAllMemberByModuleCompany(moduleId: number, compId: number) {
    let paramObj = new HttpParams()
      .set('moduleId', moduleId.toString())
      .set('compId', compId.toString())
    return this.http.get(environment.apiUrl + '/EmpGenInfo/employmentGetAllMemberListByModuleCompany/', { params: paramObj })
  }


  getSettingsDetail() {
    return this.http.get(environment.apiUrl + '/settings/GetAllDetails')
  }

  getSettValue() {
    return this.http.get(environment.apiUrl + '/settings/getSettingValue')
  }

  //#region Finanacial Year
  getAllFinancialYear(comId: number, id: number = 0) {
    return this.http.get(environment.apiUrl + '/settings/getAllFinancialYear/comId/' + comId + '/id/' + id)
  }
  //#endregion


  getAllSalaryHeadName(moduleId:number,compId:number,isActive:number) {
    var param=new HttpParams()
        .set('moduleID',moduleId.toString())
        .set('compId' ,compId.toString())
        .set('isActive',isActive.toString())        
    return this.http.get(environment.apiUrl + '/payroll/GetAllSalaryHeadNameWebsite/',{params:param})
  }

socialMediaGet(compId: number) { 
    var param = new HttpParams()
    .set("compId", compId.toString())
    return this.http.get(environment.apiUrl + "/WebsiteSetup/socialMediaLiskGet", {
      params: param,
    });
  } 

}
