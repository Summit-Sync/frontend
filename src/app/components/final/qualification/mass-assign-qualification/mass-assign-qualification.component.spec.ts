import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassAssignQualificationComponent } from './mass-assign-qualification.component';

describe('MassAssignQualificationComponent', () => {
  let component: MassAssignQualificationComponent;
  let fixture: ComponentFixture<MassAssignQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassAssignQualificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MassAssignQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
