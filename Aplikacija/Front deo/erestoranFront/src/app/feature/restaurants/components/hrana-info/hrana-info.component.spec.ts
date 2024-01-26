import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HranaInfoComponent } from './hrana-info.component';

describe('HranaInfoComponent', () => {
  let component: HranaInfoComponent;
  let fixture: ComponentFixture<HranaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HranaInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HranaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
