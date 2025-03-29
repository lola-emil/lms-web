import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section',
  imports: [NgIf, NgClass, NgFor],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

  @Input()
  tabs: { label: string, content: any; }[] = [];

  @Input()
  title: string = "";

  @Output()
  searchEvent = new EventEmitter<string>();

  search(event: Event) {
    const searchInput = event.target as HTMLInputElement;
    this.searchEvent.emit(searchInput.value);
  }
}
