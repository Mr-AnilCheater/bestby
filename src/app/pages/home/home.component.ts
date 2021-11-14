import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../_services'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestProducts:any
  constructor(private apiService:AccountService) { }

  ngOnInit(): void {
    this.getLatestProductsTrigger()
  }
  getLatestProductsTrigger(){
    this.apiService.getLatestProducts().subscribe((res:any)=>{
      this.latestProducts=res.latestProducts
    },(err)=>{})
  }
}
