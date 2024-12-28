import React, { useContext } from 'react';
import { composeRef, supportRef } from 'vc-util'
import { cloneElement } from '../reactNode';
import { ConfigContext } from '@/components/config-provider';
import { WaveComponent } from './interface'
import useWave from './useWave'
import classNames from 'classnames';
import useStyle from './style'

export interface WaveProps {
	children: React.ReactNode;
	component?: WaveComponent
}

const Wave: React.FC<WaveProps> = (props) => {
	const { children, component } = props;
	const { getPrefixCls } = useContext(ConfigContext)
	const prefixCls = getPrefixCls('wave')

	const [] = useStyle(prefixCls)
	const containerRef = React.useRef<HTMLElement>(null);
	const showWave = useWave(containerRef, classNames(prefixCls), component!)


	React.useEffect(() => {
		const node = containerRef.current
		if (!node) {
			return
		}

		const onClick = (e: MouseEvent) => {
			showWave(e)
		}

		node.addEventListener('click', onClick, true)

		return () => {
			node.removeEventListener('click', onClick, true)
		}


	}, [])


	const ref = supportRef(children) ? composeRef((children as any).ref, containerRef) : containerRef

	return cloneElement(children, { ref });
};

export default Wave;
