import React from 'react';
import { genStyleUtils } from '@ant-design/cssinjs-utils';
import { ConfigContext } from '../../config-provider';
import useLocalToken from '../useToken';

export const { genStyleHooks, genComponentStyleHook, genSubStyleComponent } =
	genStyleUtils({
		usePrefix: () => {
			const { getPrefixCls, iconPrefixCls } = React.useContext(ConfigContext);
			const rootPrefixCls = getPrefixCls();
			return {
				rootPrefixCls,
				iconPrefixCls,
			};
		},
		useToken: () => {
			const [theme, realToken, hashId, token] = useLocalToken();
			// 注入全局样式
			return { theme, realToken, token, cssVar: '' } as any;
		},
	});
