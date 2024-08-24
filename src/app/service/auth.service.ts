import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public static get CompanyId() {
    return 202;//61;//CompanyId 3 for Software Arena;//63 for Mohona
  }
  public static get ModuleId() {
    return 46;//moduleId fixed from database;
  }

  public static get MainMenuCriteria() {
    return 1;//criteria 1 for main menu fixed from database;
  }
  public static get MenuCriteria() {
    return 1;//criteria 1 for main menu fixed from database;
  }
  public static get SubMenuCriteria() {
    return 1;//criteria 1 for main menu fixed from database;
  }
}

