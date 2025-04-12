import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from '../../models';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  const mockHero: Hero = {
    id: 1,
    name: 'Spider-Man',
    slug: 'spider-man',
    appearance: {
      gender: 'Male',
      race: 'human',
      height: ['6\'2"', '191 cm'],
      weight: ['160 lb', '72 kg'],
      eyeColor: 'blue',
      hairColor: 'black',
    },
    powerstats: {
      intelligence: 88,
      strength: 14,
      speed: 25,
      durability: 50,
      power: 74,
      combat: 85,
    },
    connections: {
      groupAffiliation: 'Avengers',
      relatives: 'No relatives found.',
    },
    biography: {
      fullName: 'Peter Parker',
      alignment: 'good',
      publisher: 'Marvel Comics',
      firstAppearance: 'Amazing Fantasy #15',
      alterEgos: 'No alter egos found.',
      aliases: ['Spiderman', 'Spider-Man'],
      placeOfBirth: 'New York, New York',
    },
    work: {
      occupation: 'Photographer',
      base: 'New York, New York',
    },
    images: {
      sm: 'https://example.com/spiderman.jpg',
      md: 'https://example.com/spiderman.jpg',
      lg: 'https://example.com/spiderman.jpg',
      xs: 'https://example.com/spiderman.jpg',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, NoopAnimationsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;

    // Assign the input signal properly
    (component as any).hero = signal(mockHero);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name and full name', () => {
    const titleEl = fixture.debugElement.query(
      By.css('mat-card-title'),
    ).nativeElement;
    const subtitleEl = fixture.debugElement.query(
      By.css('mat-card-subtitle'),
    ).nativeElement;

    expect(titleEl.textContent).toContain('Spider-Man');
    expect(subtitleEl.textContent).toContain('Peter Parker');
  });

  it('should display hero alignment in title case', () => {
    const content = fixture.debugElement.query(
      By.css('mat-card-content'),
    ).nativeElement;
    expect(content.textContent).toContain('Alignment: Good');
  });

  it('should display hero image if available', () => {
    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.src).toContain(mockHero.images.sm);
    expect(imgEl.alt).toBe('Spider-Man');
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const deleteBtn = fixture.debugElement.query(By.css('button'));
    deleteBtn.triggerEventHandler('click', null);
    expect(component.delete.emit).toHaveBeenCalledWith(mockHero);
  });
});
