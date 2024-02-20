import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopwidgetComponent } from './topwidget.component';

describe('TopwidgetComponent', () => {
  let component: TopwidgetComponent;
  let fixture: ComponentFixture<TopwidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopwidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
