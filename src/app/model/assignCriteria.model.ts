import { CriteriaCenterModel } from './lookup';

export class AssignCriteriaModel{
         id:number;
         detailsID:number;
         memberID:number;
         moduleID:number;
         compID:number;
         serviceAccountID:number;
         Items:CriteriaCenterModel[];
         Services:AssignCriteriaModel[];
}
