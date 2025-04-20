import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicItem, TopicListService } from '../../services/topic-list.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-detail-lesson-list',
  imports: [DatePipe],
  templateUrl: './subject-detail-lesson-list.component.html',
  styles: ``
})
export class SubjectDetailLessonListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private teacherSubjectId?: string | null = "";
  topics: TopicItem[] = [];

  constructor(
    private topicListService: TopicListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const subjectId = this.route.parent?.snapshot.paramMap.get("id");
    this.teacherSubjectId = subjectId;

    this.updateTopicList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateTopicList() {
    this.subscriptions.push(
      this.topicListService.getTopicList(this.teacherSubjectId ?? "")
        .subscribe(val => {
          this.topics = val;
        })
    );
  }

}
