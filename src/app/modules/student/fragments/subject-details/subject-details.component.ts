import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { SubjectService } from '../../../../services/subject.service';
import { Subscription, tap } from 'rxjs';
import { Topic, TopicService } from '../../../../services/topic.service';
import { TableHeader, TableComponent } from '../../../../ui/table/table.component';

@Component({
  selector: 'app-subject-details',
  imports: [TableComponent],
  templateUrl: './subject-details.component.html',
  styles: ``
})
export class SubjectDetailsComponent implements AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];
  title: string = "";
  topics: Topic[] = [];


  topicTableHeader: TableHeader[] = [
    {
      text: "Title",
      value: "title"
    }
  ];

  @Input()
  id: any;

  constructor(
    private subjectService: SubjectService,
    private topicService: TopicService
  ) {}

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.subjectService.getSubjects({id: this.id})
      .pipe(
        tap(data => {
          const result = data[0];
          this.title = result.subject_name;
        })
      )
      .subscribe(),

      this.topicService.get({subject_id: this.id})
      .pipe(
        tap(data => {
          this.topics = data;
        })
      )
      .subscribe()
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
