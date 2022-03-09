import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstagramComponent } from './add-instagram.component';

describe('AddInstagramComponent', () => {
  let component: AddInstagramComponent;
  let fixture: ComponentFixture<AddInstagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
