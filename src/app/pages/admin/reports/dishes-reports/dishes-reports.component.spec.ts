import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesReportsComponent } from './dishes-reports.component';

describe('DishesReportsComponent', () => {
  let component: DishesReportsComponent;
  let fixture: ComponentFixture<DishesReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
