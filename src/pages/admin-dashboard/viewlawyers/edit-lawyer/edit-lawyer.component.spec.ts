import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLawyerComponent } from './edit-lawyer.component';

describe('EditLawyerComponent', () => {
  let component: EditLawyerComponent;
  let fixture: ComponentFixture<EditLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLawyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
