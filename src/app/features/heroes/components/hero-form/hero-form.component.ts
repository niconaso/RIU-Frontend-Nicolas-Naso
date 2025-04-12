import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UppercaseDirective } from '../../../../shared/directives';
import { Hero } from '../../models';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    UppercaseDirective,
    MatTooltipModule,
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroFormComponent implements OnChanges {
  @Input() hero: Hero | null = null;
  @Output() save = new EventEmitter<Partial<Hero>>();

  #fb = inject(FormBuilder);

  form: FormGroup = this.#fb.group({
    name: this.#fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    biography: this.#fb.group({
      fullName: this.#fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      alignment: this.#fb.control('', {
        validators: [Validators.required],
      }),
      publisher: this.#fb.control('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      firstAppearance: this.#fb.control('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    }),
    work: this.#fb.group({
      occupation: this.#fb.control('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
    }),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero'].currentValue != null) {
      this.form?.patchValue(this.flattenHero(changes['hero'].currentValue));
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { name, biography, work } = this.form.value;

    const hero: Partial<Hero> = {
      ...this.hero,
      name,
      biography,
      work,
    };

    this.save.emit(hero);
  }

  private flattenHero(hero: Hero): any {
    return {
      name: hero.name,
      biography: {
        fullName: hero.biography?.fullName || '',
        alignment: hero.biography?.alignment || '',
        publisher: hero.biography?.publisher || '',
        firstAppearance: hero.biography?.firstAppearance || '',
      },
      work: {
        occupation: hero.work?.occupation || '',
      },
    };
  }
}
