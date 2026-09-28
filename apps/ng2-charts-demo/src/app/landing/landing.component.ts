import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MarkdownComponent],
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
