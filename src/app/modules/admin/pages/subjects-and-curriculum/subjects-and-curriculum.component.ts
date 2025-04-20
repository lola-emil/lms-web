import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerLayoutComponent } from "../../fragments/drawer-layout/drawer-layout.component";
import { RouterLink } from '@angular/router';
import { SubjectRepoService } from '../../../../repositories/subject-repo.service';
import { Subscription, tap } from 'rxjs';
import { SubjectListItem, SubjectListService } from '../../services/subject-list.service';

@Component({
  selector: 'app-subjects-and-curriculum',
  imports: [DrawerLayoutComponent, RouterLink],
  templateUrl: './subjects-and-curriculum.component.html',
  styles: ``
})
export class SubjectsAndCurriculumComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  subjectsCount = 0;
  subjectList: SubjectListItem[] = [];

  limit = 10;
  page = 1;
  maxPage = 1;

  constructor(
    private subjectRepo: SubjectRepoService,
    private subjectListService: SubjectListService
  ) { }


  ngOnInit(): void {
    this.subscriptions.push(

      // GET SUBJECTS COUNT
      this.subjectRepo.count()
        .subscribe(val => {
          this.subjectsCount = val.count;
          this.maxPage = Math.ceil(this.subjectsCount / this.limit);
        }),
    );

    this.updateSubjectList();
  }

  updateSubjectList() {

    this.subscriptions.push(
      // GET SUBJECT LIST
      this.subjectListService.getSubjectList({
        limit: this.limit,
        offset: this.limit * (this.page - 1)
      })
        .pipe(
          tap(val => {
            this.subjectList = val;
          })
        ).subscribe()
    );
  }

  nextPage() {
    this.page += 1;
    this.updateSubjectList();
  }
  prevPage() {
    this.page -= 1;
    this.updateSubjectList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  addNewSubject() { }
}
