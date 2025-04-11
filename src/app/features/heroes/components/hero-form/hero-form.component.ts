import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroFormComponent implements OnInit {
  hero = input<Hero | null>(null);
  save = output<Partial<Hero>>();

  form!: FormGroup;

  #fb = inject(FormBuilder);

  ngOnInit() {
    this.form = this.#fb.group({
      name: this.#fb.control(this.hero()?.name || '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      biography: this.#fb.group({
        fullName: this.#fb.control(this.hero()?.biography?.fullName || '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        alignment: this.#fb.control(this.hero()?.biography?.alignment || '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        publisher: this.#fb.control(this.hero()?.biography?.publisher || '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        firstAppearance: this.#fb.control(
          this.hero()?.biography?.firstAppearance || '',
          { nonNullable: true, validators: [Validators.required] },
        ),
      }),
      work: this.#fb.group({
        occupation: this.#fb.control(this.hero()?.work?.occupation || '', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      }),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { name, biography, work } = this.form.value;

    const hero: Partial<Hero> = {
      ...this.hero(),
      name,
      biography,
      work,
    };

    this.save.emit(hero);
  }
}
