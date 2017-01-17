import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsModule } from '../ng2-charts';

const html = ``;

describe('Component: ng2-charts', () => {
  let fixture:ComponentFixture<any>;
  let context:TestChartsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestChartsComponent],
      imports: [ChartsModule]
    });
    TestBed.overrideComponent(TestChartsComponent, {set: {template: html}});
    fixture = TestBed.createComponent(TestChartsComponent);
    context = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('fixture should not be null', () => {
    expect(fixture).not.toBeNull();
  });
});

@Component({
  selector: 'charts-test',
  template: ''
})

class TestChartsComponent {
}
