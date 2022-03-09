import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendReceivedComponent } from './send-received.component';

describe('SendReceivedComponent', () => {
  let component: SendReceivedComponent;
  let fixture: ComponentFixture<SendReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
