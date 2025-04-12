import { Images } from '../../../shared/models';
import { Appearance } from './appearance.interface';
import { Biography } from './biography.interface';
import { Connections } from './connections.interface';
import { Powerstats } from './power-stats.interface';
import { Work } from './work.interface';

export interface Hero {
  id: number;
  name: string;
  slug: string;
  powerstats: Powerstats;
  appearance: Appearance;
  biography: Biography;
  work: Work;
  connections: Connections;
  images: Images;
}
