import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesCardComponent } from './cases-card.component';

describe('CasesCardComponent', () => {
  let component: CasesCardComponent;
  let fixture: ComponentFixture<CasesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
