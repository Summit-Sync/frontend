import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTemplateDetailViewComponent } from './group-template-detail-view.component';

describe('GroupTemplateDetailViewComponent', () => {
  let component: GroupTemplateDetailViewComponent;
  let fixture: ComponentFixture<GroupTemplateDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupTemplateDetailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupTemplateDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
