import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotCredentialComponent } from './forgot-credential.component';

describe('ForgotCredentialComponent', () => {
  let component: ForgotCredentialComponent;
  let fixture: ComponentFixture<ForgotCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotCredentialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
