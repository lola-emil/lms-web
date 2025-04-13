import { Component } from '@angular/core';

@Component({
  selector: 'app-subject-list',
  imports: [],
  templateUrl: './subject-list.component.html',
  styles: ``
})
export class SubjectListComponent {

  userListPage = 1;
  userListMaxPage = 1;

  prevUserListPage() {}
  nextUserListPage() {}
}
