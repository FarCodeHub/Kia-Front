
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Condition } from 'app/shared/models/condition-model';

@Component({
  selector: 'c-filter-menu',
  templateUrl: './data-table-filter-menu.component.html',
  styleUrls: ['./data-table-filter-menu.component.scss']
})
export class DataTableFilterMenuComponent implements OnInit {


  @Input()
  title: string;
  @Input()
  field: string;
  @Input()
  filters: any[];

  @Output()
  filtersChanged = new EventEmitter<any>();

  @ViewChild('menu', { static: true }) menu: MatMenu;



  public conditionsList = CONDITIONS_LIST;
  public searchValue: any;
  public searchCondition: any = CONDITIONS_LIST[3];
  private _filterMethods = CONDITIONS_FUNCTIONS;


  constructor() { }

  ngOnInit(): void {
  }

  applyFilter() {
    const me = this;
    let searchFilter: any = {
      value: this.searchValue,
      condition: this.searchCondition,
      // method: this._filterMethods,
      title: this.title,
      toServerCondition: function (): Condition {
        return {
          propertyName: me.field,
          comparison: me.searchCondition.operator,
          values: [me.searchValue],
        }
      }
    }

    this.filters[this.field] = searchFilter;
    this.filtersChanged.emit(this.filters);
  }

  clearColumn(): void {
    delete this.filters[this.field];
    this.filtersChanged.emit(null);

  }

}

export interface Filter {
  value: any,
  condition: string,
  title: string,
  toServerCondition: () => Condition
}
export const CONDITIONS_LIST = [
  // { value: "nono", label: "هیچی", symbol: "",operator: },
  { label: "عدم مقدار", symbol: "خالی باشد", operator: "is-null" },
  { label: "دارای مقدار", symbol: "پر باشد", operator: "is-not-null" },
  { label: "مساوی با", symbol: "=", operator: "==" },
  { label: "مشتمل بر", symbol: "شامل", operator: "contains" },
  { label: "نا مساوی", symbol: "<>", operator: "!=" },
  { label: "بزرگتر", symbol: ">", operator: ">" },
  { label: "بزرگتر مساوری", symbol: ">=", operator: ">=" },
  { label: "کوچکتر", symbol: "<", operator: "<" },
  { label: "کوچکتر مساوی", symbol: "<=", operator: "<=" }
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
  "is-empty": function (value, filterdValue) {
    return value === "";
  },
  "is-not-empty": function (value, filterdValue) {
    return value !== "";
  },
  "is-equal": function (value, filterdValue) {
    return value == filterdValue;
  },
  "is-not-equal": function (value, filterdValue) {
    return value != filterdValue;
  }
};
