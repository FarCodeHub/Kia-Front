import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBranchComponent } from './map-branch.component';

describe('MapBranchComponent', () => {
  let component: MapBranchComponent;
  let fixture: ComponentFixture<MapBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
