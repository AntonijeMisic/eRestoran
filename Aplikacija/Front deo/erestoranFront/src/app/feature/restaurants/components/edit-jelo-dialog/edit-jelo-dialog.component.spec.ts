import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJeloDialogComponent } from './edit-jelo-dialog.component';

describe('EditJeloDialogComponent', () => {
  let component: EditJeloDialogComponent;
  let fixture: ComponentFixture<EditJeloDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJeloDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJeloDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
