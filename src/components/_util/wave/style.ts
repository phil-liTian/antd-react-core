import { CSSInterpolation } from '@ant-design/cssinjs';
import { genComponentStyleHook } from '../../theme/utils/genStyleUtils';

const genWaveStyle = (token): CSSInterpolation => {
	const { componentCls, colorPrimary } = token;
	return {
		[componentCls]: {
			position: 'absolute',
			background: 'transparent',
			pointerEvents: 'none',
			boxSizing: 'border-box',
			boxShadow: `0 0 0 0 currentcolor`,
			opacity: 0.2,
			color: `var(--wave-color, ${colorPrimary})`,

			'&.wave-motion-appear': {
				transition: [
					`box-shadow 0.4s ${token.motionEaseOutCirc}`,
					`opacity 2s ${token.motionEaseOutCirc}`,
				].join(','),

				'&-active': {
					boxShadow: `0 0 0 6px currentcolor`,
					opacity: 0,
				},
				'&.wave-quick': {
					transition: [
						`box-shadow ${token.motionDurationSlow} ${token.motionEaseInOut}`,
						`opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
					].join(','),
				},
			},
		},
	};
};

export default genComponentStyleHook('Wave', (token) => {
	return genWaveStyle(token);
});
