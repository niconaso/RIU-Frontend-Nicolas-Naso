import { HEROES_SERVICE } from './features/heroes/services';
import { HeroInmemoryMockService } from './features/heroes/services/mock/hero-in-memory-mock.service';
import { HeroJsonServerService } from './features/heroes/services/mock/hero-json-server.service';
import { DataSource } from './shared/types';

export function provideSetupDataSource(dataSource: DataSource = 'in-memory') {
  const providers = {
    'in-memory': [
      {
        provide: HEROES_SERVICE,
        useClass: HeroInmemoryMockService,
      },
    ],
    'json-server': [
      {
        provide: HEROES_SERVICE,
        useClass: HeroJsonServerService,
      },
    ],
    api: [
      {
        provide: HEROES_SERVICE,
        useClass: HeroInmemoryMockService,
      },
    ],
  };

  return providers[dataSource];
}
