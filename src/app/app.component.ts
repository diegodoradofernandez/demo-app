import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TopVentas';

  ngOnInit() {
  }

  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
      });
  }

  go(path) {
      this.router.navigateByUrl(path);
      return( false );
  }


}
