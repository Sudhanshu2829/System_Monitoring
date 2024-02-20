import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesstableComponent } from './processtable.component';

describe('ProcesstableComponent', () => {
  let component: ProcesstableComponent;
  let fixture: ComponentFixture<ProcesstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesstableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcesstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
