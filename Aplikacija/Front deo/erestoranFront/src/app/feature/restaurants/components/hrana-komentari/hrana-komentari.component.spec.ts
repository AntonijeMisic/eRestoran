import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HranaKomentariComponent } from './hrana-komentari.component';

describe('HranaKomentariComponent', () => {
  let component: HranaKomentariComponent;
  let fixture: ComponentFixture<HranaKomentariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HranaKomentariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HranaKomentariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
