import { FormArray } from "@angular/forms";

export class BasicEntryModel {
  id:number;
  description:string;
  compId:number;
  sortOrder:number;
  tableName:string;
  tAG:number;
  userID:number;
  companyType:number;
  remarks:string;
  itemBasic:any[];
  moduleID:number;
}

export class allServiceSubHeadNameModel {
  id:number;
  accountID: number;
  unitPrice: number;
  serviceName: string;
  quentity: number;
  totalPrice: number;
  amount: number;
  serviceID:number;
  subServiceName: any;
  //allServiceSubHeadNameArray: FormArray[]
  compId: any;

}

export class SocailMediaModel{
  id:number;
  compId:number; 
  socialMediaName:string;
  Links:string; 
}
