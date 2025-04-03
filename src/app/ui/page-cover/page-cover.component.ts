import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-cover',
  imports: [],
  templateUrl: './page-cover.component.html',
  styles: ``
})
export class PageCoverComponent {

  @Input()
    pageTitle: string = ""
}
