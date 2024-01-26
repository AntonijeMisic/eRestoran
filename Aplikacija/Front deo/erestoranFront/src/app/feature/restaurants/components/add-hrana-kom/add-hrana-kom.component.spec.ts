import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHranaKomComponent } from './add-hrana-kom.component';

describe('AddHranaKomComponent', () => {
  let component: AddHranaKomComponent;
  let fixture: ComponentFixture<AddHranaKomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHranaKomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHranaKomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
