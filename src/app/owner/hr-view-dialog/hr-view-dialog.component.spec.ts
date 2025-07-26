import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewDialogComponent } from './hr-view-dialog.component';

describe('HrViewDialogComponent', () => {
  let component: HrViewDialogComponent;
  let fixture: ComponentFixture<HrViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrViewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
