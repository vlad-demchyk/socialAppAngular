import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextEventPage } from './next-event-page';

describe('NextEventPage', () => {
  let component: NextEventPage;
  let fixture: ComponentFixture<NextEventPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextEventPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
