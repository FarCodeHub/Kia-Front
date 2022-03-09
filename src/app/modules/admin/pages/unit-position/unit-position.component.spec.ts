import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitPositionComponent } from './unit-position.component';

describe('UnitPositionComponent', () => {
  let component: UnitPositionComponent;
  let fixture: ComponentFixture<UnitPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
