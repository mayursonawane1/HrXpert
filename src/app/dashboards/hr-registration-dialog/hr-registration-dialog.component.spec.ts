import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRegistrationDialogComponent } from './hr-registration-dialog.component';

describe('HrRegistrationDialogComponent', () => {
  let component: HrRegistrationDialogComponent;
  let fixture: ComponentFixture<HrRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrRegistrationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
