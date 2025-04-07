import { Component, EventEmitter, Input, Output } from '@angular/core';

export type TableHeader = {
  label?: string;
  value?: string;
  align?: "center" | "left" | "right",
  clickable?: boolean;
};

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  @Input()
  headers: TableHeader[] = [];

  @Input()
  data: { [key: string]: any; }[] = [];

  @Output()
  onItemClicked = new EventEmitter();

  itemClicked(item: any) {
    this.onItemClicked.emit(item);
  }


  @Output()
  onSearch = new EventEmitter();

  search(event: Event) {
    this.onSearch.emit(event);
  }

  page: number = 1;
  itemsPerPage = 5;

  @Output()
  onPrevPage = new EventEmitter();

  prevPage() {
    if (this.page > 1)
      this.page -= 1;

    this.onPrevPage.emit(this.page);
  };

  @Output()
  onNextPage = new EventEmitter();

  nextPage() {
    if (this.page < this.data.length)
      this.page += 1;

    this.onNextPage.emit(this.page);
  };
}
