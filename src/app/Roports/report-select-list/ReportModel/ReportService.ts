import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Helper } from "./helper";

@Injectable({
    providedIn: 'root'
  })
  export class ReportService {
  
  
    constructor(private http: HttpClient) { }
  
    openFileWindow(file: Blob, fileName?: string, save: Boolean = false) {
      debugger
      const data = new Blob([file], { type: file.type })
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(data, this.getUniqueStr(fileName));
      } else {
  
        var objectUrl = URL.createObjectURL(data);
        window.open(objectUrl);
  
        if (save) {
          var fileLink = document.createElement('a');
          fileLink.href = objectUrl;
          fileLink.download = this.getUniqueStr(fileName);
  
          fileLink.click();
        }
      }
    }
    private getUniqueStr(fileName: string) {
      let date = new Date();
      let y = date.getFullYear();
      let m = (date.getMonth() + 1).toString().padStart(2, '0');
      let d = date.getDate().toString().padStart(2, '0');
      let h = date.getHours().toString().padStart(2, '0');
      let min = date.getMinutes().toString().padStart(2, '0');
      let s = date.getSeconds().toString().padStart(2, '0');
      fileName = fileName ? fileName + '_' : '';
      return fileName + y + '' + m + '' + d + '' + h + '' + min + '' + s;
    }
  
    public exportTypes():any[]{
      return [
        {type:'pdf', typeName:'PDF'},
        {type:'xls', typeName:'XLS'},
        {type:'xlsx', typeName:'XLSX'},
        {type:'docx', typeName:'DOCX'}
      ]
    }
    saveReport(reportObj){
      return this.http.post(environment.reportApiUrl+'/report/save',reportObj);
    }
    getStoredProcedure(){
      return this.http.get(environment.reportApiUrl+'/spInfo/get');
    }
    getReports(companyId:number=-1,moduleId:number = -1, pageId:number=-1 ){ 
      const paramObj = new HttpParams()
      .append('companyId', companyId.toString())
      .append('moduleId', moduleId.toString())
      .append('pageId', pageId.toString())
      return this.http.get<any>(environment.reportApiUrl+`/reports/get`, {params:paramObj});
    }
    //Test
    getReportsByUser(companyId:number=-1,moduleId:number = -1, pageId:number=-1,userId:number=-1 ){
      const paramObj = new HttpParams()
      .append('companyId', companyId.toString())
      .append('moduleId', moduleId.toString())
      .append('pageId', pageId.toString())
      .append('userId',userId.toString())
      return this.http.get<any>(environment.reportApiUrl+`/reports/getReportsByUser`, {params:paramObj});
    }
  //end
    getAccReport(paramObj){
      let httpParam = Helper.convObjToHttpParam(paramObj);
      return this.http.get(environment.reportApiUrl+'/accounting/',{params:httpParam, responseType:'blob'})
    }
    getCommercialReport(paramObj){
      let httpParam = Helper.convObjToHttpParam(paramObj);
      return this.http.get(environment.reportApiUrl+'/commercial/',{params:httpParam, responseType:'blob'})
    }
  
    getCommercialReportForRpt(paramObj){   
      debugger
      //console.log("GowodnId",paramObj.godownId);
      let httpParam = Helper.convObjToHttpParam(paramObj);
      return this.http.get(environment.reportApiUrl+'/commercialRpt/',{params:httpParam, responseType:'blob'})
    }
    getInventoryReportForRpt(paramObj){
      let httpParam = Helper.convObjToHttpParam(paramObj);
      return this.http.get(environment.reportApiUrl+'/inventory/',{params:httpParam, responseType:'blob'})
    }
    getSalePurchaseReport(paramObj){
      let httpParam = Helper.convObjToHttpParam(paramObj);
      return this.http.get(environment.reportApiUrl+'/salePurchase/',{params:httpParam, responseType:'blob'})
    }
  }
  