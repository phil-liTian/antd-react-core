import type {
	FullToken as FullTokenTypeUtil,
	GlobalToken as GlobalTokenTypeUtil,
	TokenMapKey,
} from '@ant-design/cssinjs-utils';
import type { ComponentTokenMap } from './components';
import type { AliasToken } from '../interface/alias';

export type FullToken<C extends TokenMapKey<ComponentTokenMap>> =
	FullTokenTypeUtil<ComponentTokenMap, AliasToken, C>;

export type GlobalToken = GlobalTokenTypeUtil<ComponentTokenMap, AliasToken>;
