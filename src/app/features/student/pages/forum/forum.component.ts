import { Component } from '@angular/core';
import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ForumService } from '../../services/forum.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-forum',
  imports: [CommonModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {

  forums: Observable<any[]>;

  constructor(
    private forumService: ForumService
  ) {
    this.forums = this.forumService.get().pipe(map((val: any) => val.data))
  }

  avatar = createAvatar(pixelArt, {
    seed: "bilat sa Kabayo"
  }).toDataUri();

}
