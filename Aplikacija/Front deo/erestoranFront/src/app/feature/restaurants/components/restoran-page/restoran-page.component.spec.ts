import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoranPageComponent } from './restoran-page.component';

describe('RestoranPageComponent', () => {
  let component: RestoranPageComponent;
  let fixture: ComponentFixture<RestoranPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoranPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoranPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
