import { Component, Input } from '@angular/core';
import { createAvatar } from "@dicebear/core";
import { pixelArt } from '@dicebear/collection';
@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  @Input() title: string = "";

  avatar = createAvatar(pixelArt, {
    seed: "SpiderBrad"
  }).toDataUri();

}
