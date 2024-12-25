import { generate } from '@ant-design/colors';

export const generateColorPalettes = (baseColor: string) => {
	const colors = generate(baseColor);

	return {
		1: colors[0],
		2: colors[1],
		3: colors[2],
		4: colors[3],
		5: colors[4],
		6: colors[5],
		7: colors[6],
		8: colors[4],
		9: colors[5],
		10: colors[6],
	};
};
