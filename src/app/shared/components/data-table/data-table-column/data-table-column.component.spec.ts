import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableColumnComponent } from './data-table-column.component';

describe('DataTableColumnComponent', () => {
  let component: DataTableColumnComponent;
  let fixture: ComponentFixture<DataTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
