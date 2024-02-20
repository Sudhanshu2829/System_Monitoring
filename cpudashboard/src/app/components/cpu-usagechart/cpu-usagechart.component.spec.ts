import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuUsagechartComponent } from './cpu-usagechart.component';

describe('CpuUsagechartComponent', () => {
  let component: CpuUsagechartComponent;
  let fixture: ComponentFixture<CpuUsagechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpuUsagechartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpuUsagechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
