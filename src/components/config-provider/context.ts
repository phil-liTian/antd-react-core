import React from 'react';

export const defaultPrefixCls = 'phil';
export const defaultIconPrefixCls = 'anticon'

export interface ConfigConsumerProps {
	getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
	iconPrefixCls: string
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
	iconPrefixCls: defaultIconPrefixCls
});
