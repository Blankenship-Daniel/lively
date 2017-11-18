import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionQueueComponent } from './selection-queue.component';

describe('SelectionQueueComponent', () => {
  let component: SelectionQueueComponent;
  let fixture: ComponentFixture<SelectionQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
