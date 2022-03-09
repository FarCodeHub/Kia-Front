import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedSmsComponent } from './received-sms.component';

describe('ReceivedSmsComponent', () => {
  let component: ReceivedSmsComponent;
  let fixture: ComponentFixture<ReceivedSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
