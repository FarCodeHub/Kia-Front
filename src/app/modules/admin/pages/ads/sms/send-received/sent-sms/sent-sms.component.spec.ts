import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentSmsComponent } from './sent-sms.component';

describe('SentSmsComponent', () => {
  let component: SentSmsComponent;
  let fixture: ComponentFixture<SentSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
