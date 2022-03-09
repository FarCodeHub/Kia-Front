import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComisionComponent } from './add-comision.component';

describe('AddComisionComponent', () => {
  let component: AddComisionComponent;
  let fixture: ComponentFixture<AddComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
