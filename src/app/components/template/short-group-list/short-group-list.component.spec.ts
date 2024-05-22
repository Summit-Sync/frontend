import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortGroupListComponent } from './short-group-list.component';

describe('ShortGroupListComponent', () => {
  let component: ShortGroupListComponent;
  let fixture: ComponentFixture<ShortGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortGroupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
