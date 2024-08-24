// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // apiUrl: 'http://175.29.186.86:3000/api/v1',

//  apiUrl: 'http://localhost:3001/api/v1',

 apiUrl: 'http://103.125.253.59:2001/api/v1',
  // apiUrl: 'http://175.29.186.86:7001/api/v1',
 // reportApiUrl: 'http://localhost:5200/api/erp',
 
 
 //apiUrl: 'http://103.125.253.59:7001/api/v1', 

 
  reportApiUrl: 'http://175.29.186.86:6003/api/erp',
  uploadPath:{
    slider:'D:\\Website\\Website\\src\\assets\\images\\slider\\'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
