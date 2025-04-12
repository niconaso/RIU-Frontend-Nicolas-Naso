import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  numberAttribute,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { Observable, shareReplay, take } from 'rxjs';
import { HeroFormComponent } from '../../components';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';
import { HEROES_SERVICE } from '../../services';

@Component({
  selector: 'app-hero-edit-page',
  standalone: true,
  imports: [
    HeroFormComponent,
    AsyncPipe,
    RouterModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './hero-edit-page.component.html',
  styleUrl: './hero-edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroEditPageComponent implements OnInit {
  @Input({ transform: numberAttribute }) id!: number;

  #heroService: IHeroService = inject(HEROES_SERVICE);
  #router = inject(Router);

  heroe$!: Observable<Hero>;

  ngOnInit(): void {
    this.heroe$ = this.#heroService.get(this.id).pipe(shareReplay());
  }

  onSave(hero: Partial<Hero>) {
    const saveOrUpdate$ = this.id
      ? this.#heroService.update(hero)
      : this.#heroService.create(hero);

    saveOrUpdate$
      .pipe(take(1))
      .subscribe(() => this.#router.navigateByUrl('/heroes'));
  }
}
