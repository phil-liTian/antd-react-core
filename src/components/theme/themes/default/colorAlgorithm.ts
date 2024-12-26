import { TinyColor } from '@ctrl/tinycolor';

export const getAlphaColor = (color: string, alpha: number) => {
	const tinyColor = new TinyColor(color);
	return tinyColor.setAlpha(alpha).toRgbString();
};

export const getSolidColor = (baseColor: string, brightness: number) => {
	const instance = new TinyColor(baseColor);
	return instance.darken(brightness).toHexString();
};
