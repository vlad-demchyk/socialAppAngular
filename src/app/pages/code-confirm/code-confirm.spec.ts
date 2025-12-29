import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCOnfirm } from './code-confirm';

describe('CodeCOnfirm', () => {
  let component: CodeCOnfirm;
  let fixture: ComponentFixture<CodeCOnfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCOnfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeCOnfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
