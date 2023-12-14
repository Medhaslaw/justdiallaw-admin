import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquriesComponent } from './enquries.component';

describe('EnquriesComponent', () => {
  let component: EnquriesComponent;
  let fixture: ComponentFixture<EnquriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
