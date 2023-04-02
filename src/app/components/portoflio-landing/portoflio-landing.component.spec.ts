import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortoflioLandingComponent } from './portoflio-landing.component';

describe('PortoflioLandingComponent', () => {
  let component: PortoflioLandingComponent;
  let fixture: ComponentFixture<PortoflioLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortoflioLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortoflioLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
