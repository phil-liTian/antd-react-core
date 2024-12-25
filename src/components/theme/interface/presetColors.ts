export const PresetColors = [
	'blue',
	'purple',
	'cyan',
	'green',
	'magenta',
	'pink',
	'red',
	'orange',
	'yellow',
	'volcano',
	'geekblue',
	'lime',
	'gold',
] as const;

export type PresetColorKey = (typeof PresetColors)[number];

export type PresetColorType = Record<PresetColorKey, string>;
