import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContentComponent } from './show-content.component';

describe('ShowContentComponent', () => {
  let component: ShowContentComponent;
  let fixture: ComponentFixture<ShowContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
