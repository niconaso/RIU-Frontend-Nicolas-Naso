import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';
import { HEROES_SERVICE } from '../../services';

@Component({
  selector: 'app-hero-edit-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './hero-edit-page.component.html',
  styleUrl: './hero-edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEditPageComponent implements OnInit {
  @Input({ transform: numberAttribute }) id!: number;

  #heroService: IHeroService = inject(HEROES_SERVICE);

  heroe$!: Observable<Hero>;

  ngOnInit(): void {
    this.heroe$ = this.#heroService.get(this.id);
  }
}
