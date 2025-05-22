import { Component, OnInit } from '@angular/core';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForumDiscussion, ForumService } from './services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-forum',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  forums!: Observable<any[]>;
  newForum = { title: '', content: '' };

  studentSubjectId?: number;
  teacherSubjectId?: number;

  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.route.parent?.params.subscribe(val => this.studentSubjectId = parseInt(val['id']));
  }

  ngOnInit(): void {
    this.loadForums();

  }

  announcements: (ForumDiscussion & { showReplies: boolean; })[] = [];

  loadForums() {
    this.forumService.getStudentEnrolledSubject(this.studentSubjectId ?? 0)
      .subscribe(res => {
        this.teacherSubjectId = res.data.studentEnrolledSubject.teacherSubjectId;
        this.forumService.getAnnouncements(res.data.studentEnrolledSubject.teacherSubjectId ?? 0)
          .subscribe(res => {
            this.announcements = res.data.forumDiscussions.map(data => ({
              ...data,
              showReplies: false
            }));

            this.announcements.forEach(val => {
              this.replyForms.push(new FormGroup({
                forumDiscussionId: new FormControl(val.id),
                commentText: new FormControl("")
              }));
            });
          });
      });
  }

  getAvatar(seed: string): string {
    return createAvatar(pixelArt, { seed }).toDataUri();
  }

  toggleReplies(forum: any) {
    forum.showReplies = !forum.showReplies;
  }

  forumForm = new FormGroup({
    title: new FormControl(""),
    query: new FormControl("")
  });

  replyForms: FormGroup[] = [];

  texts = new FormArray([]);

  askQuestion() {
    let form = this.forumForm.value as any;

    if (this.teacherSubjectId)
      form = {
        ...form,
        teacherSubjectId: this.teacherSubjectId
      };


    this.forumService.postAnnouncement(form)
      .subscribe(res => {
        this.loadForums();
      });
  }

  addReply(index: number) {
    console.log(this.replyForms[index].value);

    this.forumService.addReply({
      ...this.replyForms[index].value,
      createdById: this.authService.getUserDetail().id
    })
      .subscribe(res => {
        this.loadForums();
      });
  }
}
