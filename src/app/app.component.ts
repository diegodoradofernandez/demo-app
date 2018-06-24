
import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TopVentas';

  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
      });
  }

   /**
   * Click en menú de navegación.
   * @param path
    */
  go(path: string) {
      this.router.navigateByUrl(path);
      return( false );
  }


}
