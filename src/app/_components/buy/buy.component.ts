import { Component, OnInit,ChangeDetectorRef,Input } from '@angular/core';
import { ExternalLibraryService } from './utils';
import {AccountService} from '../../_services'
declare let Razorpay: any;

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
  response:any;
  razorpayResponse :any;
  payment_details:any
  @Input() productId:any

  constructor(private razorpayService: ExternalLibraryService, private cd:  ChangeDetectorRef,private apiservice : AccountService) { }

  ngOnInit(): void {



    this.apiservice.getPayment().subscribe((res:any)=>{
      this.payment_details =res
    },(err:any)=>{})

    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();

  }
  ngAfterViewInit(){
   
  }

    RAZORPAY_OPTIONS = {
    "key":'',
    "amount": "",
    "name": "Novopay",
    "order_id": "",
    "description": "Load Wallet",
    "image": "https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg",
    "prefill": {
      "name": "",
      "email": "test@test.com",
      "contact": "1201201202",
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };


    public proceed() {
      var data={
        product:this.productId
      }

      this.apiservice.sendProductId(data).subscribe((res:any)=>{
      
      this.RAZORPAY_OPTIONS.key = this.payment_details.api_key;
      this.RAZORPAY_OPTIONS.amount =res.status.amount;
      this.RAZORPAY_OPTIONS.order_id = res.status.order_id;
      // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();

      },(err:any)=>{})
      
      

    
  }

  public razorPaySuccessHandler(response) {
    
    var data ={
      'razorpay_order_id': response.razorpay_order_id,
      'razorpay_payment_id': response.razorpay_payment_id,
      'razorpay_signature': response.razorpay_signature,
      'product':this.productId,
      'amount':this.RAZORPAY_OPTIONS.amount
    }
    
    this.apiservice.sendPaymentDetails(data).subscribe((res:any)=>{},(err:any)=>{})
    this.razorpayResponse = `Razorpay Response`;
    
    this.cd.detectChanges()
    
  }

}
