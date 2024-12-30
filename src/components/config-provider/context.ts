import React from 'react';
import { RenderEmptyHandler } from './defaultRenderEmpty';

export const defaultPrefixCls = 'phil';
export const defaultIconPrefixCls = 'anticon';
export type DirectionType = 'ltr' | 'rtl' | undefined;

export interface ConfigConsumerProps {
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
	iconPrefixCls: string;
	renderEmpty?: RenderEmptyHandler;
	direction?: DirectionType;
}

const defaultGetPrefixCls = (
	suffixCls?: string,
	customizePrefixCls?: string
) => {
	if (customizePrefixCls) return customizePrefixCls;

	return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
	getPrefixCls: defaultGetPrefixCls,
	iconPrefixCls: defaultIconPrefixCls,
});
