import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomentariComponent } from './komentari.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('KomentariComponent', () => {
  let component: KomentariComponent;
  let fixture: ComponentFixture<KomentariComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KomentariComponent ],
      providers: [MatDialogModule, { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KomentariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

