import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsPaymentsComponent } from './documents-payments.component';

describe('DocumentsPaymentsComponent', () => {
  let component: DocumentsPaymentsComponent;
  let fixture: ComponentFixture<DocumentsPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
