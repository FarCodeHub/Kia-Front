import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSideBarComponent } from './add-edit-side-bar.component';

describe('AddEditSideBarComponent', () => {
  let component: AddEditSideBarComponent;
  let fixture: ComponentFixture<AddEditSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
