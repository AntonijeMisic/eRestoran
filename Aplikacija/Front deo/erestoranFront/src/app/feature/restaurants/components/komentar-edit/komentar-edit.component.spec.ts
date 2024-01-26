import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomentarEditComponent } from './komentar-edit.component';

describe('KomentarEditComponent', () => {
  let component: KomentarEditComponent;
  let fixture: ComponentFixture<KomentarEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KomentarEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KomentarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
