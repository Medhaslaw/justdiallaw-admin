import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersaddComponent } from './lawyersadd.component';

describe('LawyersaddComponent', () => {
  let component: LawyersaddComponent;
  let fixture: ComponentFixture<LawyersaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyersaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyersaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
