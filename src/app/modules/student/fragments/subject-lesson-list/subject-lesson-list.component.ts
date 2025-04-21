import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicListService } from '../../services/topic-list.service';
import { DatePipe } from '@angular/common';
import { catchError, of, Subscription, tap } from 'rxjs';
import { TopicItem } from '../../../teacher/services/topic-list.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { QuizSessionRepoService } from '../../../../repositories/quiz-session-repo.service';
import { AuthService } from '../../../../services/auth.service';

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

  quizSessions: { [quizId: number]: boolean; } = {};

  constructor(
    private topicListService: TopicListService,
    private route: ActivatedRoute,
    private router: Router,
    private quizSessionRepo: QuizSessionRepoService,
    private authService: AuthService
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

  loadSessions() {

  }

  takeQuiz(id: number) {
    this.quizSessionRepo.post({
      quiz_id: id,
      student_id: this.authService.getUserDetail().user_id
    }).pipe(
      tap(val => {
        console.log(val);
        this.router.navigate(["student/quiz"], {
          queryParams: {
            session_id: val[0].id,
            quiz_id: val[0].quiz_id
          }
        });
      }),
      catchError(error => {
        return of(null);
      })
    ).subscribe();
  }

}
