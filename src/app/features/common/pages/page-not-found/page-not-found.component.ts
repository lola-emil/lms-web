import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageNotFoundSvgComponent } from '../../../../shared/svg/page-not-found-svg/page-not-found-svg.component';

@Component({
  selector: 'app-page-not-found',
  imports: [PageNotFoundSvgComponent, RouterLink],
  templateUrl: './page-not-found.component.html',
  styles: ``
})
export class PageNotFoundComponent {

}
