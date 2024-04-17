import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupTemplateComponent } from './add-group-template.component';

describe('AddGroupTemplateComponent', () => {
  let component: AddGroupTemplateComponent;
  let fixture: ComponentFixture<AddGroupTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroupTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddGroupTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
