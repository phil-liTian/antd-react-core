import { PresetColorType } from '../interface/presetColors';
import { SeedToken } from '../interface/seeds';

export const defaultPresetColors: PresetColorType = {
	blue: '#1677FF',
	purple: '#722ED1',
	cyan: '#13C2C2',
	green: '#52C41A',
	magenta: '#EB2F96',
	/**
	 * @deprecated Use magenta instead
	 */
	pink: '#EB2F96',
	red: '#F5222D',
	orange: '#FA8C16',
	yellow: '#FADB14',
	volcano: '#FA541C',
	geekblue: '#2F54EB',
	gold: '#FAAD14',
	lime: '#A0D911',
};

const seedToken: SeedToken = {
	...defaultPresetColors,

	colorPrimary: '#1677ff',
	colorSuccess: '#52c41a',
	colorWarning: '#faad14',
	colorError: '#ff4d4f',
	colorInfo: '#1677ff',

	colorBgBase: '',
	colorTextBase: '',

	lineWidth: 1,
	lineType: 'solid',

	// radius
	borderRadius: 6,

	sizeUnit: 4,
	sizeStep: 4,

	// font
	fontSize: 14,

	controlHeight: 32,

	// motion
	motionUnit: 0.1,
	motionBase: 0,
	motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
	motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
	motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
	motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
	motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
	motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
	motionEaseInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
	motionEaseOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
};

export default seedToken;
