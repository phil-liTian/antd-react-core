import { PresetColorType } from './presetColors';

export interface SeedToken extends PresetColorType {
	colorPrimary: string;
	colorSuccess: string;
	colorWarning: string;
	colorError: string;
	colorInfo: string;
	colorBgBase: string;
	colorTextBase: string;

	lineWidth: number;
	lineType: string;

	// borderRadius
	borderRadius: number;

	// size
	sizeUnit: number;
	sizeStep: number;

	// fontSize
	fontSize: number;

	controlHeight: number;

	// motion
	motionUnit: number;
	motionBase: number;
	motionEaseOutCirc: string;
	motionEaseInOutCirc: string;
	motionEaseOut: string;
	motionEaseInOut: string;
	motionEaseOutBack: string;
	motionEaseInBack: string;
	motionEaseInQuint: string;
	motionEaseOutQuint: string;
}
