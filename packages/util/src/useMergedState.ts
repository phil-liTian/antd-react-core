import useState from './useState';

type Updater<T> = (
	updater: T | ((origin: T) => T),
	ignoreDestroy?: boolean
) => void;

function hasValue(value: any) {
	return value !== undefined;
}

export default function useMergedState<T, R = T>(
	defaultStateValue: T | (() => T),
	options?: {
		defaultValue?: T | (() => T);
		value?: T;
		onChange?: (value: T, prevValue: T) => void;
		postState?: (value: T) => T;
	}
): [R, Updater<T>] {
	const { defaultValue, value, onChange, postState } = options || {};
	const [innerValue, setInnerValue] = useState<T>(() => {
		if (hasValue(value)) {
			return value;
		} else {
			return typeof defaultStateValue === 'function'
				? (defaultStateValue as any)()
				: defaultStateValue;
		}
	});

	const mergedValue = value ?? innerValue;

	const triggerChange = (updater, ignoreDestroy) => {
		setInnerValue(updater, ignoreDestroy);
	};

	return [mergedValue as unknown as R, triggerChange];
}
