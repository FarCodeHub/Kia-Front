import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseValueTypeComponent } from './add-base-value-type.component';

describe('AddBaseValueComponent', () => {
  let component: AddBaseValueTypeComponent;
  let fixture: ComponentFixture<AddBaseValueTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBaseValueTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBaseValueTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
