import { Injectable } from '@angular/core';
import { shapes } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor() { }

  avatar(seed: any) {
    return createAvatar(shapes, {
      seed
    }).toDataUri();
  }
}
