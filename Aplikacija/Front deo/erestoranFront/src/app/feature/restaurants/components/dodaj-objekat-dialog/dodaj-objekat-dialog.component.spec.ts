import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajObjekatDialogComponent } from './dodaj-objekat-dialog.component';

describe('DodajObjekatDialogComponent', () => {
  let component: DodajObjekatDialogComponent;
  let fixture: ComponentFixture<DodajObjekatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajObjekatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajObjekatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
