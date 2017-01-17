import { Component, Input } from '@angular/core';

@Component({
  selector: 'chart-section',
  templateUrl: './char-section.component.html'
})
export class ChartSectionComponent {
  // @Input() public id:string;
  @Input() public ts:string;
  @Input() public html:string;
  @Input() public heading:string;
}
