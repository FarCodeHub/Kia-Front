import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultDialogComponent } from './add-result-dialog.component';

describe('AddResultDialogComponent', () => {
  let component: AddResultDialogComponent;
  let fixture: ComponentFixture<AddResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
