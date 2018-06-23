import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent {
  title = 'TopVentas';

=======
export class AppComponent implements OnInit {
  title = 'TopVentas';

  ngOnInit() {
  }

>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
      });
  }

<<<<<<< HEAD
   /**
   * Click en menú de navegación.
   * @param path
    */
  go(path : string) {
=======
  go(path) {
>>>>>>> e2cca6f72741cc61600428950af2ff55af5ddba8
      this.router.navigateByUrl(path);
      return( false );
  }


}
