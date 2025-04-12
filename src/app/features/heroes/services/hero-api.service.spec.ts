import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { Hero } from '../models';
import { HeroAPIService } from './hero-api.service';

describe('HeroAPIService', () => {
  let service: HeroAPIService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.http.api}/heroes`;

  const mockHero: Hero = {
    id: 1,
    name: 'Batman',
    slug: 'batman',
    powerstats: {
      intelligence: 100,
      strength: 26,
      speed: 27,
      durability: 50,
      power: 47,
      combat: 100,
    },
    appearance: {
      gender: 'Male',
      race: 'Human',
      height: ['6ft', '183cm'],
      weight: ['210lb', '95kg'],
      eyeColor: 'blue',
      hairColor: 'black',
    },
    biography: {
      fullName: 'Bruce Wayne',
      alterEgos: 'No alter egos found.',
      aliases: ['The Dark Knight', 'The Caped Crusader'],
      placeOfBirth: 'Gotham City',
      firstAppearance: 'Detective Comics #27',
      publisher: 'DC Comics',
      alignment: 'good',
    },
    work: {
      occupation: 'CEO of Wayne Enterprises',
      base: 'Gotham City',
    },
    connections: {
      groupAffiliation: 'Justice League, Batman Family',
      relatives: 'Thomas Wayne (father), Martha Wayne (mother)',
    },
    images: {
      xs: 'batman-xs.jpg',
      sm: 'batman-sm.jpg',
      md: 'batman-md.jpg',
      lg: 'batman-lg.jpg',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroAPIService],
    });

    service = TestBed.inject(HeroAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch paginated heroes', () => {
    const mockResponse = {
      body: {
        total: 1,
        data: [mockHero],
      },
    };

    service.getAll(1, 10, 'batman').subscribe((res) => {
      expect(res.total).toBe(1);
      expect(res.data.length).toBe(1);
      expect(res.data[0].name).toBe('Batman');
    });

    const req = httpMock.expectOne(
      (request) =>
        request.method === 'GET' &&
        request.url === baseUrl &&
        request.params.get('_page') === '1' &&
        request.params.get('_limit') === '10' &&
        request.params.get('_per_page') === '10' &&
        request.params.get('name') === 'batman',
    );

    req.flush(mockResponse.body, { status: 200, statusText: 'OK' });
  });

  it('should fetch a hero by ID', () => {
    service.get(1).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should create a hero', () => {
    service.create(mockHero).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockHero);
    req.flush(mockHero);
  });

  it('should update a hero', () => {
    const updatedHero = { ...mockHero, name: 'The Dark Knight' };

    service.update(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedHero);
    req.flush(updatedHero);
  });

  it('should delete a hero', () => {
    service.delete(1).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
