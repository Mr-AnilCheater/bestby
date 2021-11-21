import { Component } from '@angular/core';
import{Router,NavigationEnd} from '@angular/router'
import { AccountService,AnalyticsService } from './_services';
import { User } from './_models';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService, private readonly angularticsGoogleService: Angulartics2GoogleAnalytics,private readonly analyticsService: AnalyticsService,private router:Router) {
        this.accountService.user.subscribe(x => this.user = x);
        this.analyticsService.init();
        this.angularticsGoogleService.startTracking();
    }

    ngOnInit(){
        this.analyticsService.init();

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (window as any).ga('set', 'page', event.urlAfterRedirects);
          (window as any).ga('send', 'pageview');
        }
      });
    }
}