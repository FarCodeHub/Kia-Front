import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAddHeaderComponent } from './page-add-header.component';

describe('PageAddHeaderComponent', () => {
  let component: PageAddHeaderComponent;
  let fixture: ComponentFixture<PageAddHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAddHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
