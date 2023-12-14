import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgmodalComponent } from './imgmodal.component';

describe('ImgmodalComponent', () => {
  let component: ImgmodalComponent;
  let fixture: ComponentFixture<ImgmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
