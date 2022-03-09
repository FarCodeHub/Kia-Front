import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorStatusComponent } from './operator-status.component';

describe('OperatorStatusComponent', () => {
  let component: OperatorStatusComponent;
  let fixture: ComponentFixture<OperatorStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
