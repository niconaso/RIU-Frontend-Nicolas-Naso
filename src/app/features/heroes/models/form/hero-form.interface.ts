import { Biography } from '../biography.interface';
import { Work } from '../work.interface';

export type BiographyForm = Pick<
  Biography,
  'fullName' | 'alignment' | 'publisher' | 'firstAppearance'
>;
export type WorkForm = Pick<Work, 'occupation'>;

export interface HeroForm {
  name: string;
  biography: BiographyForm;
  work: WorkForm;
}
