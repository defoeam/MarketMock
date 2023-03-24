import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLandingComponent } from './stock-landing.component';

describe('StockLandingComponent', () => {
  let component: StockLandingComponent;
  let fixture: ComponentFixture<StockLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
