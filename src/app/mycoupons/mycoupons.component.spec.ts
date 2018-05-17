import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycouponsComponent } from './mycoupons.component';

describe('MycouponsComponent', () => {
  let component: MycouponsComponent;
  let fixture: ComponentFixture<MycouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
