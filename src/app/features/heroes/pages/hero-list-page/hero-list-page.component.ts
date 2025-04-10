import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroListComponent } from '../../components';
import { IHeroService } from '../../interfaces';
import { HEROES_SERVICE } from '../../services';

@Component({
  selector: 'app-hero-list-page',
  standalone: true,
  imports: [CommonModule, AsyncPipe, HeroListComponent],
  templateUrl: './hero-list-page.component.html',
  styleUrl: './hero-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListPageComponent {
  #heroService: IHeroService = inject(HEROES_SERVICE);

  heroes$ = this.#heroService.getAll();
}
