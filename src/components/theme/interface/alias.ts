import { MapToken } from '.';

export interface AliasToken extends MapToken {
	marginXS: number;
	marginXXS: number;
	marginSM: number;
	margin: number;

	colorTextLightSolid: string;

	paddingContentHorizontal: number;
	paddingContentHorizontalSM: number;
	paddingContentHorizontalLG: number;
	paddingContentVerticalLG: number;
	paddingContentVertical: number;
	paddingContentVerticalSM: number;

	fontSizeIcon: number;

	colorTextHeading: string;
}
