import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertismentChartDialogComponent } from './advertisment-chart-dialog.component';

describe('AdvertismentChartDialogComponent', () => {
  let component: AdvertismentChartDialogComponent;
  let fixture: ComponentFixture<AdvertismentChartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertismentChartDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertismentChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
