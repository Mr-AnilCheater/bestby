import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent,HeaderComponent,FooterComponent,SearchComponent,AddToCartComponent,BuyComponent } from './_components';
// import { HomeComponent } from './home';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductInfoComponent,HomeComponent,ViewCartComponent } from './pages';
import { Angulartics2Module } from 'angulartics2';




@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        Angulartics2Module.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        ProductInfoComponent,
        AddToCartComponent,
        ViewCartComponent,
        BuyComponent,
    
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };