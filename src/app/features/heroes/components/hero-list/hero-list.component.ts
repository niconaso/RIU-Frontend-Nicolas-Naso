import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from '../../models';
import { HeroComponent } from '../hero/hero.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroComponent, RouterModule, EmptyStateComponent],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent {
  heroes = input.required<Hero[]>();

  delete = output<Hero>();
}
