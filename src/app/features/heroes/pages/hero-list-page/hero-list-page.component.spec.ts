import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PaginatedResponse } from '../../../../shared/models';
import { IHeroService } from '../../interfaces';
import { Hero } from '../../models';
import { HEROES_SERVICE } from '../../services';
import { HeroListPageComponent } from './hero-list-page.component';

describe('HeroListPageComponent', () => {
  let component: HeroListPageComponent;
  let fixture: ComponentFixture<HeroListPageComponent>;
  let heroServiceSpy: jasmine.SpyObj<IHeroService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockHeroesResponse: PaginatedResponse<Hero> = {
    data: [
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
    ],
    total: 1,
  };

  beforeEach(async () => {
    heroServiceSpy = jasmine.createSpyObj<IHeroService>('IHeroService', [
      'getAll',
      'delete',
    ]);
    dialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        HeroListPageComponent,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: HEROES_SERVICE, useValue: heroServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListPageComponent);
    component = fixture.componentInstance;

    heroServiceSpy.getAll.and.returnValue(of(mockHeroesResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on init', (done) => {
    component.results$.subscribe((result) => {
      expect(result).toEqual(mockHeroesResponse);
      expect(heroServiceSpy.getAll).toHaveBeenCalledWith(0, 10, null);
      done();
    });
  });

  it('should update filter on search', () => {
    heroServiceSpy.getAll.calls.reset();

    component.onSearch('spider');
    fixture.detectChanges();

    component.results$.subscribe(() => {
      expect(heroServiceSpy.getAll).toHaveBeenCalledWith(0, 10, 'spider');
    });
  });

  it('should update pagination on page change', () => {
    component.onPageChange({ pageIndex: 1, pageSize: 25 });
    fixture.detectChanges();

    component.results$.subscribe(() => {
      expect(heroServiceSpy.getAll).toHaveBeenCalledWith(1, 25, null);
    });
  });
});
