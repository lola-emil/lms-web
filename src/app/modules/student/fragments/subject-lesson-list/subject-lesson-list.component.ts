import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicListService } from '../../services/topic-list.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { TopicItem } from '../../../teacher/services/topic-list.service';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-lesson-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './subject-lesson-list.component.html',
  styles: ``
})
export class SubjectLessonListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  subjectId: string | null | undefined = null;
  topics: TopicItem[] = [];

  constructor(
    private topicListService: TopicListService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.subjectId = this.route.parent?.snapshot.paramMap.get("id");
    console.log(this.subjectId);
    this.updateTopicList();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateTopicList() {
    this.subscriptions.push(
      this.topicListService.getTopicList(this.subjectId ?? "")
        .subscribe(val => {
          this.topics = val;
        })
    );
  }

}
