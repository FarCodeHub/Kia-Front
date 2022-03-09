import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdsIntoSiteComponent } from './add-ads-into-site.component';

describe('AddAdsIntoSiteComponent', () => {
  let component: AddAdsIntoSiteComponent;
  let fixture: ComponentFixture<AddAdsIntoSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdsIntoSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdsIntoSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
