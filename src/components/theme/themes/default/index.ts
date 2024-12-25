import { SeedToken } from '../../interface';
import { genColorMapToken } from '../shared/genColorMapToken';
import genSizeMapToken from '../shared/genSizeMapToken';
import { generateColorPalettes } from './colors';

export default function derivative(token: SeedToken) {
	return {
		...token,
		// colors
		...genColorMapToken(token, {
			generateColorPalettes,
		}),

		// size
		...genSizeMapToken(token),
	};
}
