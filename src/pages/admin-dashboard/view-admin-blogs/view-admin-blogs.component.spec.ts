import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminBlogsComponent } from './view-admin-blogs.component';

describe('ViewAdminBlogsComponent', () => {
  let component: ViewAdminBlogsComponent;
  let fixture: ComponentFixture<ViewAdminBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminBlogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
