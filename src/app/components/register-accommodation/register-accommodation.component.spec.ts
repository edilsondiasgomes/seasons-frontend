import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccommodationComponent } from './register-accommodation.component';

describe('RegisterAccommodationComponent', () => {
  let component: RegisterAccommodationComponent;
  let fixture: ComponentFixture<RegisterAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAccommodationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
