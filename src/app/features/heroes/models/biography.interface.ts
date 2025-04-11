import { Alignment } from '../types';

export interface Biography {
  fullName: string;
  alterEgos?: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: null | string;
  alignment: Alignment;
}
