import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TopImageModel } from '../model/topImage.model';
import { WebsiteServiceService } from '../service/website-service.service'; 
import { ProductListModel } from '../model/productListModel';

@Component({
  selector: 'app-our-product',
  templateUrl: './our-product.component.html',
  styleUrls: ['./our-product.component.css']
})
export class OurProductComponent implements OnInit {
compId:number;
allProduct: ProductListModel[]; 
  constructor(
    private websiteService:WebsiteServiceService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId
    this.getAllProduct();
  }


  getAllProduct() {
    this.websiteService.getAllProduct(this.compId).subscribe((result: any) => {
      if (result) {
         console.log("getAllProduct",result.result)

        this.allProduct = (result.result as ProductListModel[])

          .map(img => {
            img.extension = img.wPicture.split('.')[1];
            return img;
          });

      }
    })
  }

}
