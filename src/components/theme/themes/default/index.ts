import { SeedToken } from '../../interface';
import { genColorMapToken } from '../shared/genColorMapToken';
import genSizeMapToken from '../shared/genSizeMapToken';
import genFontMapToken from '../shared/genFontMapToken';
import { generateColorPalettes, generateNeutralColorPalettes } from './colors';
import genCommonMapToken from '../shared/genCommonMapToken';

export default function derivative(token: SeedToken) {
	return {
		...token,
		// colors
		...genColorMapToken(token, {
			generateColorPalettes,
			generateNeutralColorPalettes,
		}),

		// size
		...genSizeMapToken(token),

		// font & lineHeight
		...genFontMapToken(token.fontSize),

		// common
		...genCommonMapToken(token),
	};
}
