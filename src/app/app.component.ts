import { Component, ElementRef, OnInit, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationStart, Router } from '@angular/router';
import { FlyoutComponent } from './components/flyout/flyout.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'star-wars';
  currentComponent?: string | Type<any>;
  currentUrl?: string;

  @ViewChild('headerPoint', { static: true }) header?: ElementRef;
  @ViewChildren(FlyoutComponent) flyouts?: QueryList<FlyoutComponent>;

  types = ['people', 'planets', 'starships', 'vehicles'];


  constructor(
    private router: Router,
    private active: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.currentUrl = '/';
      }
      if (evt instanceof ActivationEnd) {
        const ae = evt as ActivationEnd;
        this.currentUrl = this.router.url;
      }
    });
  }

  async go(route: string) {
    this.router.navigateByUrl(route);
  }
}
