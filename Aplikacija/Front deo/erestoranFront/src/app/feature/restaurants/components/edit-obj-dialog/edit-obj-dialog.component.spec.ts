import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObjDialogComponent } from './edit-obj-dialog.component';

describe('EditObjDialogComponent', () => {
  let component: EditObjDialogComponent;
  let fixture: ComponentFixture<EditObjDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditObjDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditObjDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
