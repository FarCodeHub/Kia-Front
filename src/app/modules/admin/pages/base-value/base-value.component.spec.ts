import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseValueComponent } from './base-value.component';

describe('BaseValueComponent', () => {
  let component: BaseValueComponent;
  let fixture: ComponentFixture<BaseValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
