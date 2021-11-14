import { Component, OnInit,Input } from '@angular/core';
import {AccountService,AlertService} from '../../_services'

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  @Input() itemId: number;
  @Input() itemCount:number;
  constructor(private apiservice:AccountService,private alertService:AlertService) { }

  ngOnInit(): void {
    
  }
  addToCart(){
      var data={
      product:this.itemId,
      product_count:this.itemCount
    }
    this.apiservice.addToCart(data).subscribe((res:any)=>{this.alertService.success(res.status)},(err:any)=>{})
  }
}
