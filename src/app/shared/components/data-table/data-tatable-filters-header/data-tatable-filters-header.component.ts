import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'c-data-table-filters-header',
  templateUrl: './data-tatable-filters-header.component.html',
  styleUrls: ['./data-tatable-filters-header.component.scss']
})
export class DataTatableFiltersHeaderComponent implements OnInit {

  Object = Object;
  @Input()
  filters: any[];
  @Output()
  filtersChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  removeFilter(key) {
    delete this.filters[key];
    this.filtersChanged.emit(this.filters);
  }

  removeAll() {
    this.filters = [];
    this.filtersChanged.emit(this.filters);
    let result = this.Send(new MyCommand());
    console.log(result.result);
  }


  public Send<TResponse>(request: IRequest<TResponse>): TResponse {

    return <TResponse>null;
  }


}


export class IRequest<T> {
  returnType: T
}

export class ServiceResultX {
  public result: string;
}


export class MyCommand extends IRequest<ServiceResultX> {

}






