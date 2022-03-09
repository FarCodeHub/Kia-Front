import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseValueComponent } from './add-base-value.component';

describe('AddBaseValueComponent', () => {
  let component: AddBaseValueComponent;
  let fixture: ComponentFixture<AddBaseValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBaseValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBaseValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
