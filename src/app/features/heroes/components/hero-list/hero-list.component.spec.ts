import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { Hero } from '../../models';
import { HeroComponent } from '../hero/hero.component';
import { HeroListComponent } from './hero-list.component';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  const mockHeroes: Hero[] = [
    {
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
    },
    {
      id: 2,
      name: 'Captain America',
      slug: 'captain-america',
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
        fullName: 'Steve Rogers',
        alignment: 'good',
        publisher: 'Marvel Comics',
        firstAppearance: 'Captain America Comics #1',
        alterEgos: 'No alter egos found.',
        aliases: ['Captain America', 'Captain America III'],
        placeOfBirth: 'New York, New York',
      },
      work: {
        occupation: 'Soldier',
        base: 'New York, New York',
      },
      images: {
        sm: 'https://example.com/captainamerica.jpg',
        md: 'https://example.com/captainamerica.jpg',
        lg: 'https://example.com/captainamerica.jpg',
        xs: 'https://example.com/captainamerica.jpg',
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroListComponent,
        HeroComponent,
        EmptyStateComponent,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    (component as any).heroes = signal(mockHeroes);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render all hero cards', () => {
    (component as any).heroes = signal(mockHeroes);
    fixture.detectChanges();

    const heroEls = fixture.debugElement.queryAll(By.css('app-hero'));
    expect(heroEls.length).toBe(2);
  });

  it('should show the empty state when there are no heroes', () => {
    (component as any).heroes = signal([]);
    fixture.detectChanges();

    const emptyStateEl = fixture.debugElement.query(By.css('app-empty-state'));
    expect(emptyStateEl).toBeTruthy();
    expect(emptyStateEl.nativeElement.textContent).toContain(
      'There are no heroes',
    );
  });

  it('should emit delete event when a hero card emits delete', () => {
    (component as any).heroes = signal(mockHeroes);
    fixture.detectChanges();

    spyOn(component.delete, 'emit');

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent),
    );
    const firstHeroComponent = heroComponents[0]
      .componentInstance as HeroComponent;

    firstHeroComponent.delete.emit(mockHeroes[0]);

    expect(component.delete.emit).toHaveBeenCalledWith(mockHeroes[0]);
  });
});
