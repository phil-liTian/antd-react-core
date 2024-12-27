import { SeedToken } from '../../interface';
import { CommonMapToken } from '../../interface/map';

export default function genCommonMapToken(token: SeedToken): CommonMapToken {
	const { motionBase, motionUnit } = token;
	return {
		motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
		motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
		motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
	};
}
