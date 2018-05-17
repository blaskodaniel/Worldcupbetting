import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedmatchesComponent } from './playedmatches.component';

describe('PlayedmatchesComponent', () => {
  let component: PlayedmatchesComponent;
  let fixture: ComponentFixture<PlayedmatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayedmatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayedmatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
