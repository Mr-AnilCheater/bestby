import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {AccountService} from '../../_services'
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  path:any;
  productDetail:any
  count:any=1

  constructor(private apiservice:AccountService,private router:Router) {
    this.path=this.router.url.slice(14)
   }

  ngOnInit(): void {
    this.openProductTrigger()
  }
  openProductTrigger(){
    this.apiservice.productInfo(this.path).subscribe(
      (res:any)=>{
        this.productDetail=res.productDetail
      }
      ,(err:any)=>{})
  }

  dec(count:any,id:any){
    if(this.count > 1){
    this.count=this.count-1
    console.log(this.count)
  }
  }
  inc(count:any,b:any){
    if(this.count < 7){
    this.count=this.count+1
    console.log(this.count)
  }
  }

}
