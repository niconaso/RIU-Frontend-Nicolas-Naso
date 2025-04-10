import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-list-page',
  standalone: true,
  imports: [],
  templateUrl: './hero-list-page.component.html',
  styleUrl: './hero-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListPageComponent {}
