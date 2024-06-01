import { Component, OnInit } from '@angular/core';

import { Calculator } from './calculator';
import { FooterComponent } from './components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [BannerComponent, RouterLink, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const rta = calculator.multiply(3,3);
    // console.log(rta === 9);
    const rta2 = calculator.divide(3,0);
    // console.log(rta2 === null);
  }
}
