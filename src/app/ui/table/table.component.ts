import { Component, Input } from '@angular/core';

export type TableHeader = {
  text?: string,
  value?: string,
  onItemClicked?: (data: any) => void
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
  tableData: any = [];
}
