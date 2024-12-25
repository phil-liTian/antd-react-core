import { AliasToken } from '../interface/alias';

export default function formatToken(derivativeToken): AliasToken {
	const mergedToken = {
		...derivativeToken,
	};

	let aliasToken = {
		...mergedToken,
		paddingContentVerticalSM: 4,
	};

	return aliasToken;
}
