import { OnInit, Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  /**
   * Warning: Modification of the app selector
   * may prevent automatic updates of this project in the future.
   * More details: https://community.backbase.com/documentation/Retail-Apps/latest/web_app_upgradability_understand
   */

  /**
   * Warning: Modification of the app selector
   * may prevent automatic updates of this project in the future.
   * More details: https://community.backbase.com/documentation/Retail-Apps/latest/web_app_upgradability_understand
   */
  selector: 'bb-retail-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly titleService: Title,
  ) {}
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          // find first route with a title set (if any)
          let lastRouteWithTitle = route;
          while (route.firstChild) {
            route = route.firstChild;
            if (this.getTitle(route)) {
              lastRouteWithTitle = route;
            }
          }
          return lastRouteWithTitle;
        }),
        filter((route) => route.outlet === 'primary'),
        map((route) => this.getTitle(route)),
        filter((title): title is string => title !== undefined),
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }

  private getTitle(route: ActivatedRoute): string | undefined {
    const routeData = route.snapshot.data;
    return routeData?.custom?.title;
  }
}
