import { PresetColorType } from './presetColors';

export interface SeedToken extends PresetColorType {
	colorPrimary: string;
	colorSuccess: string;
	colorWarning: string;
	colorError: string;
	colorInfo: string;

	lineWidth: number;
	lineType: string;

	// borderRadius
	borderRadius: number;

	// size
	sizeUnit: number;
	sizeStep: number;
}
