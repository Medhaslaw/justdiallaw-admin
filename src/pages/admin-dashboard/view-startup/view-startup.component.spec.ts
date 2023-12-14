import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStartupComponent } from './view-startup.component';

describe('ViewStartupComponent', () => {
  let component: ViewStartupComponent;
  let fixture: ComponentFixture<ViewStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
