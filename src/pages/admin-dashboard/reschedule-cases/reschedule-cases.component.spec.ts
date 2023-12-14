import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleCasesComponent } from './reschedule-cases.component';

describe('RescheduleCasesComponent', () => {
  let component: RescheduleCasesComponent;
  let fixture: ComponentFixture<RescheduleCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescheduleCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
