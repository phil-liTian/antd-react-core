import type { Theme } from '@ant-design/cssinjs';
import { useCacheToken } from '@ant-design/cssinjs';
import defaultSeedToken from './themes/seed';
import React from 'react';
import { defaultTheme, DesignTokenContext } from './context';
import formatToken from './utils/alias';
import { GlobalToken } from './interface/cssinjs-utils';
import { SeedToken } from './interface';

export default function useToken() {
	const { theme } = React.useContext(DesignTokenContext);

	const mergedTheme = theme || defaultTheme;
	const [token, hashId, realToken] = useCacheToken<GlobalToken, SeedToken>(
		mergedTheme,
		[defaultSeedToken],
		{
			formatToken,
		}
	);

	return [mergedTheme, realToken, '', token];
}
