import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'c-data-table-column',
  templateUrl: './data-table-column.component.html',
  styleUrls: ['./data-table-column.component.scss']
})
export class DataTableColumnComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  field: string;
  @Input()
  filters: any[];

  @Output()
  filtersChanged = new EventEmitter<any>();

  public onFiltersChanged(filters: any) {
    console.log("column filters");
    console.log(filters);
    this.filtersChanged.emit(filters);
  }

  constructor() { }

  ngOnInit(): void {
  }


}
