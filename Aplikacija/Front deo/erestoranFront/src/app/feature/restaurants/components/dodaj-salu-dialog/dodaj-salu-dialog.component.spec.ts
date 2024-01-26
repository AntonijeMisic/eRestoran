import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajSaluDialogComponent } from './dodaj-salu-dialog.component';

describe('DodajSaluDialogComponent', () => {
  let component: DodajSaluDialogComponent;
  let fixture: ComponentFixture<DodajSaluDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajSaluDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajSaluDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
