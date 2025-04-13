import { Component, OnDestroy, OnInit } from '@angular/core';
import { SectionListItem, SectionListService } from '../../services/section-list.service';
import { Subscription, tap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { GradeSectionRepoService } from '../../../../repositories/grade-section-repo.service';

@Component({
  selector: 'app-school-settings',
  imports: [DatePipe],
  templateUrl: './school-settings.component.html',
  styles: ``
})
export class SchoolSettingsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  sections: SectionListItem[] = [];

  sectionCount = 0;
  sectionListLimit = 10;
  sectionListPage = 1;
  sectionListMaxPage = 1;

  constructor(
    private sectionListService: SectionListService,
    private gradeSectionRepo: GradeSectionRepoService
  ) { }


  ngOnInit(): void {
    this.updateList();
    this.subscriptions.push(
      this.gradeSectionRepo.count()
        .subscribe(val => {
          this.sectionCount = val.count;
          this.sectionListMaxPage = Math.ceil(this.sectionCount / this.sectionListLimit);
        })
    );
  }

  updateList() {
    this.subscriptions.push(
      this.sectionListService.getSectionList(
        {
          limit: this.sectionListLimit,
          offset: this.sectionListLimit * (this.sectionListPage - 1)
        }
      )
        .pipe(
          tap(val => {
            this.sections = val;
          })
        )
        .subscribe()
    );
  }

  prevSectionListPage() {
    this.sectionListPage -= 1;
    this.updateList();
  }

  nextUserListPage() {
    this.sectionListPage += 1;
    this.updateList();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
