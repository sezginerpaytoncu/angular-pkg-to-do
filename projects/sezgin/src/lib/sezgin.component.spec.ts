import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SezginComponent } from './sezgin.component';

describe('SezginComponent', () => {
  let component: SezginComponent;
  let fixture: ComponentFixture<SezginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SezginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SezginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
