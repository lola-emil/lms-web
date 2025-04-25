import { Component } from '@angular/core';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';
import { CommonModule } from '@angular/common';
import { ForumService } from '../../services/forum.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-forum',
  imports: [CommonModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  forums!: Observable<any[]>;
  newForum = { title: '', content: '' };

  constructor(private forumService: ForumService) {
    this.loadForums();
  }

  loadForums() {
    this.forums = this.forumService.get().pipe(
      map((val: any) =>
        val.data.map((forum: any) => ({
          ...forum,
          showReplies: false,
          newReply: ''
        }))
      )
    );
  }

  getAvatar(seed: string): string {
    return createAvatar(pixelArt, { seed }).toDataUri();
  }

  toggleReplies(forum: any) {
    forum.showReplies = !forum.showReplies;
  }

  addReply(forum: any) {
    if (!forum.newReply.trim()) return;
    
    const newReply = {
      id: Date.now(),
      forum_id: forum.id,
      author: 'current_user',
      author_role: 'student',
      content: forum.newReply.trim(),
      created_at: new Date().toISOString()
    };

    forum.replies.push(newReply);
    forum.newReply = ''; // Clear input
  }

  addForum() {
    if (!this.newForum.title.trim() || !this.newForum.content.trim()) return;

    const newForum = {
      id: Date.now(),
      course_id: 101, // Example course_id
      title: this.newForum.title.trim(),
      content: this.newForum.content.trim(),
      author: 'current_user',
      author_role: 'student',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      replies: []
    };

    // Add the new forum to the list (simulate database update)
    this.forums = this.forums.pipe(
      map((forums) => [newForum, ...forums])
    );

    // Reset form fields
    this.newForum = { title: '', content: '' };
  }
}
