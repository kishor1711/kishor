import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperationComponent } from './table-operation.component';

describe('TableOperationComponent', () => {
  let component: TableOperationComponent;
  let fixture: ComponentFixture<TableOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
