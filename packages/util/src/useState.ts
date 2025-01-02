import { useState, useEffect, useRef } from 'react';

type Updater<T> = T | ((prevValue: T) => T);

export type SetState<T> = (
	nextValue: Updater<T>,
	ignoreDestroy?: boolean
) => void;

function useSafeState<T>(defaultValue?: T | (() => T)): [T, SetState<T>] {
	const destroyRef = useRef(false);
	const [value, setValue] = useState<any>(defaultValue);
	useEffect(() => {
		destroyRef.current = false;
		return () => {
			destroyRef.current = true;
		};
	}, []);

	function safeSetValue(updater: Updater<T>, ignoreDestroy?: boolean) {
		if (!ignoreDestroy && destroyRef.current) return;
		setValue(updater);
	}

	return [value!, safeSetValue];
}

export default useSafeState;
