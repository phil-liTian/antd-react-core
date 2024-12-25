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

	lineWidth: 1,
	lineType: 'solid',

	// radius
	borderRadius: 6,

	sizeUnit: 4,
	sizeStep: 4,
};

export default seedToken;
