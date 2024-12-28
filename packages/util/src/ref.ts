import * as React from 'react';

export function fillRef<T>(ref: React.Ref<T>, node: T) {
	if (typeof ref === 'function') {
		ref(node);
	} else if (typeof ref === 'object' && ref && 'current' in ref) {
		(ref as any).current = node;
	}
}

export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
	const refList = refs.filter(Boolean);
	if (refList.length <= 1) {
		return refList[0];
	}

	return (node) => {
		refList.forEach((ref) => {
			fillRef(ref, node);
		});
	};
}

function isReactElement(node: React.ReactNode) {
	return React.isValidElement(node);
}

export function supportRef(nodeOrComponent: any): boolean {
	if (!nodeOrComponent) return false;

	if (
		isReactElement(nodeOrComponent) &&
		nodeOrComponent.props.propertyIsEnumerable('ref')
	) {
		return true;
	}

	return true;
}
