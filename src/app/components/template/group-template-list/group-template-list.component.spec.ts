import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTemplateListComponent } from './group-template-list.component';

describe('GroupTemplateListComponent', () => {
  let component: GroupTemplateListComponent;
  let fixture: ComponentFixture<GroupTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupTemplateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
