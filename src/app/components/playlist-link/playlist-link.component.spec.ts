import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistLinkComponent } from './playlist-link.component';

describe('PlaylistLinkComponent', () => {
  let component: PlaylistLinkComponent;
  let fixture: ComponentFixture<PlaylistLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
