import { TARGET_CLS, WaveComponent } from './interface';
import showWaveEffect from './WaveEffect';

const useWave = (
	nodeRef: React.RefObject<HTMLElement>,
	className: string,
	component: WaveComponent
) => {
	const showWave = (event) => {
		const node = nodeRef.current;
		if (!node) return;

		const targetNode = node.querySelector(`.${TARGET_CLS}`) || node;

		showWaveEffect(targetNode, { className, component });
	};

	return showWave;
};

export default useWave;
