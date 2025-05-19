import { Component } from '@angular/core';
import { pixelArt } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Observable, map } from 'rxjs';
import { ForumService } from '../../../student/services/forum.service';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormGroup, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ForumDiscussion } from '../../../student/pages/forum/services/forum.service';
import { AnnouncementsService } from './services/announcements.service';

@Component({
  selector: 'app-announcements',
  imports: [DatePipe, NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './announcements.component.html',
  styles: ``
})
export class AnnouncementsComponent {
  forums!: Observable<any[]>;
    newForum = { title: '', content: '' };

    teacherSubjectId?: number;

    constructor(
      private forumService: AnnouncementsService,
      private route: ActivatedRoute,
      private authService: AuthService
    ) {
      this.route.parent?.params.subscribe(val => this.teacherSubjectId = parseInt(val['id']));
    }

    ngOnInit(): void {
      this.loadForums();

    }

    announcements: (ForumDiscussion & { showReplies: boolean; })[] = [];

    loadForums() {
      this.forumService.getAnnouncements(this.teacherSubjectId ?? 0)
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
