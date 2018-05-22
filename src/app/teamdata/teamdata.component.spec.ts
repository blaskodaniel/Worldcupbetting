import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamdataComponent } from './teamdata.component';

describe('TeamdataComponent', () => {
  let component: TeamdataComponent;
  let fixture: ComponentFixture<TeamdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
