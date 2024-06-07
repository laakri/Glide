import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOrdersComponent } from './delivery-orders.component';

describe('DeliveryOrdersComponent', () => {
  let component: DeliveryOrdersComponent;
  let fixture: ComponentFixture<DeliveryOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
