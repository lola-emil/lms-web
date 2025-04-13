import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  imports: [RouterLink],
  templateUrl: './subject-list.component.html',
  styles: ``
})
export class SubjectListComponent {

  constructor() { }

  userListPage = 1;
  userListMaxPage = 1;

  prevUserListPage() { }
  nextUserListPage() { }
}
