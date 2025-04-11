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
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
        validators: [Validators.required, Validators.minLength(3)],
      }),
      biography: this.#fb.group({
        fullName: this.#fb.control(this.hero()?.biography?.fullName || '', {
          validators: [Validators.required, Validators.minLength(10)],
        }),
        alignment: this.#fb.control(this.hero()?.biography?.alignment || '', {
          validators: [Validators.required],
        }),
        publisher: this.#fb.control(this.hero()?.biography?.publisher || '', {
          validators: [Validators.required, Validators.minLength(5)],
        }),
        firstAppearance: this.#fb.control(
          this.hero()?.biography?.firstAppearance || '',
          { validators: [Validators.required, Validators.minLength(5)] },
        ),
      }),
      work: this.#fb.group({
        occupation: this.#fb.control(this.hero()?.work?.occupation || '', {
          validators: [Validators.required, Validators.minLength(5)],
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
