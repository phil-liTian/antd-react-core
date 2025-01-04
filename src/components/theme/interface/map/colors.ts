export interface ColorNeutralMapToken {
	colorBgContainer: string;
	colorText: string;
}

export interface ColorLinkMapToken {
	colorLink: string;
	colorLinkHover: string;
	colorLinkActive: string;
}

export interface ColorMapToken extends ColorNeutralMapToken, ColorLinkMapToken {
	colorWhite: string;
}
