export class NewsEventModel{
    id:number
    NewsOrEvents:number
    newsInfo:string
    CompId:number
    headLine:string
    inActiveDate:string
    image:any
    picture:any
    pictureST:any[]
}

export class WebsiteHeading{
    id:number;
    moduleID:number; 
    compId:number; 
    newsType:number;
    newsDesc:string;
    userId:number;
}
export class CompanyAboutModel{
    id:number; 
    imageFile:any;
    image:string;
    compId:number;
    heading:string;
    Description:string;
    imageBase64:any;
    extension:string;
    serialNo:number;       
    active:number; 
}
export class VideoFileModel{
    id:number; 
    videoFile:any; 
    wVideoFile:any; 
    compId:number;
    moduleId:number;
    videoCaption:string;
    modifiedDate:string; 
 
}