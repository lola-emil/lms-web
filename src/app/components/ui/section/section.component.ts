import { NgClass, NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, Type } from '@angular/core';

@Component({
  selector: 'app-section',
  imports: [NgIf, NgClass, NgFor, NgComponentOutlet],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

  @Input()
  tabs: { label: string, content: Type<any>; }[] = [];
  activeTab = 0;

  @Input()
  title: string = "";

  selectTab(index: number) {
    this.activeTab = index;
  }


  @Output()
  searchEvent = new EventEmitter<string>();

  search(event: Event) {
    const searchInput = event.target as HTMLInputElement;
    this.searchEvent.emit(searchInput.value);
  }
}
