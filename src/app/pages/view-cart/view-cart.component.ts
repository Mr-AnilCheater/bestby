import { Component, OnInit } from '@angular/core';
import {AccountService,AlertService} from '../../_services'
import { User } from '../../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {
  product:any
  user: User;
  product_id:any
  form: FormGroup;
  product_count:any

  quantity=[{value:1},{value:2},{value:3},{value:4},{value:5},{value:6},{value:7}]
  constructor(private apiservice:AccountService,private formBuilder: FormBuilder,private alertService: AlertService) {
    this.user = this.apiservice.userValue;
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
          count: [''],
      });

    if(this.user){
    this.viewCartriger()
  }
  // document.getElementById('cart_id_0').
  }

     viewCartriger(){
       
     this.apiservice.getCartinfo().subscribe(
      (res:any)=>{
        this.product=res.result

      }
      ,(err:any)=>{}
      )
  }

  modifyItemFromCart(){
    var data={
      product:this.product_id,
      product_count:this.product_count
    }

    this.apiservice.modifyCartItem(data).subscribe((res:any)=>{
      this.viewCartriger()
    },(err:any)=>{})
  }


  dec(count:any,id:any){
    
    if(count-1 > 0 && count-1 < 8){
      this.product_id=id
      this.product_count=count-1

      this.modifyItemFromCart()
    }
    
  }
  inc(count:any,id:any){

    if(count+ 1 > 0 && count+1 < 8){
      this.product_id=id
      this.product_count=count+1

      this.modifyItemFromCart()
    }
  }
  deleteitemFromCart(id){
     var data={
      product:id,
    }
    this.apiservice.deleteCartItem(data).subscribe(
      (res:any)=>{
        this.viewCartriger()
        this.alertService.success(res.status)
      },
      (err:any)=>{})

  }

  

}
