import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestoranDijalogComponent } from './edit-restoran-dijalog.component';

describe('EditRestoranDijalogComponent', () => {
  let component: EditRestoranDijalogComponent;
  let fixture: ComponentFixture<EditRestoranDijalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRestoranDijalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRestoranDijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
