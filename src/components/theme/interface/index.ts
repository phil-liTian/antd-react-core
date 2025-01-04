import { ColorMapToken } from './map/colors';
import { SeedToken } from './seeds';
export * from './map/index';

export type { SeedToken };

export interface MapToken extends SeedToken, ColorMapToken {}
