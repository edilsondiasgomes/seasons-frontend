import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredAccommodationsComponent } from './registered-accommodations.component';

describe('RegisteredAccommodationsComponent', () => {
  let component: RegisteredAccommodationsComponent;
  let fixture: ComponentFixture<RegisteredAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredAccommodationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
