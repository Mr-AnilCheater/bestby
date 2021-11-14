import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../_services';
import { User } from '../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isVisited = false;
  public dropdown =false
  user: User;
  categoryData:any
  searchResult:any
  openmenu=false
  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(private accountService: AccountService, private formBuilder: FormBuilder,private router:Router) {
      this.accountService.user.subscribe(x => this.user = x);
      this.user = this.accountService.userValue;
  }
  
  logout() {
      this.accountService.logout();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      category:['all',],
      product: ['',]
  });
  if(this.user){
    this.getDetails()
  }
 
   this.accountService.getCategories().subscribe((res:any)=>{this.categoryData=res.user},(err:any)=>{})
  }
  

  search(){
    this.searchTrigger();
    this.router.navigateByUrl('/product_info')  
  }
  callsearch(){
    this.searchTrigger()
  }
  searchTrigger(){
    var data={
      category:this.form.value.category,
      product:this.form.value.product
    }
    this.accountService.search(data).subscribe(
      (res:any)=>{
        this.searchResult=res.result
      },
      (err:any)=>{

      })
  }
  

  getDetails(){
    this.accountService.getUserDetails().subscribe((res:any)=>{
      this.user.firstName=res.firstname
    },(err:any)=>{})

   

    this.viewCartriger()
  }
   viewCartriger(){
       let sum=0
     this.accountService.getCartinfo().subscribe(
      (res:any)=>{
      
        for(let i of res.result){
         sum = sum + i.count
        }
        this.user.cart=sum
       
      }
      ,(err:any)=>{}
      )
  }
}
