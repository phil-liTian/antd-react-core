import { SeedToken } from '../seeds';
import { ColorMapToken, ColorNeutralMapToken } from './colors';
import { FontMapToken } from './font';
import { SizeMapToken } from './size';

export interface CommonMapToken {
	motionDurationFast: string;
	motionDurationMid: string;
	motionDurationSlow: string;
}

export interface MapToken
	extends SeedToken,
		SizeMapToken,
		ColorMapToken,
		FontMapToken,
		CommonMapToken,
		ColorNeutralMapToken {}
