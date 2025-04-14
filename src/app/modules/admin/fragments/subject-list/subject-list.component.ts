import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubjectListItem, SubjectListService } from '../../services/subject-list.service';

@Component({
  selector: 'app-subject-list',
  imports: [RouterLink],
  templateUrl: './subject-list.component.html',
  styles: ``
})
export class SubjectListComponent implements OnInit, OnDestroy {

  subjectList: SubjectListItem[] = [];

  constructor(
    private subjectListService: SubjectListService
  ) { }


  ngOnInit(): void {
    this.subjectListService.getSubjectList().subscribe(val => this.subjectList = val);
  }

  ngOnDestroy(): void {
  }

  userListPage = 1;
  userListMaxPage = 1;

  prevUserListPage() { }
  nextUserListPage() { }
}
