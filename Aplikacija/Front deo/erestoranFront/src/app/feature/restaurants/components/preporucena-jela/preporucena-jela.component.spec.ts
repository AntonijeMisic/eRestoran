import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreporucenaJelaComponent } from './preporucena-jela.component';

describe('PreporucenaJelaComponent', () => {
  let component: PreporucenaJelaComponent;
  let fixture: ComponentFixture<PreporucenaJelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreporucenaJelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreporucenaJelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
