import { Component, OnInit, Type, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, ActivationEnd } from '@angular/router';
import { FlyoutComponent } from './components/flyout/flyout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'star-wars';
  currentComponent?: string | Type<any>;
  currentUrl?: string;

  @ViewChild('header', { static: true }) header: ElementRef;
  @ViewChildren(FlyoutComponent) flyouts: QueryList<FlyoutComponent>;

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

  async go(route) {
    this.router.navigateByUrl(route);
  }
}
