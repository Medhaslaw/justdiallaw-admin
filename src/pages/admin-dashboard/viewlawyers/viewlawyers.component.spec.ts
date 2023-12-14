import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlawyersComponent } from './viewlawyers.component';

describe('ViewlawyersComponent', () => {
  let component: ViewlawyersComponent;
  let fixture: ComponentFixture<ViewlawyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlawyersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewlawyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
