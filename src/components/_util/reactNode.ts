import React from 'react';

export function replaceElement(
	element: React.ReactNode,
	replacement: React.ReactNode,
	props?: any
) {
	if (!React.isValidElement(element)) {
		return replacement;
	}

	return React.cloneElement(
		element,
		typeof props === 'function' ? props(element.props || {}) : props
	);
}

export function cloneElement(element: React.ReactNode, props: any) {
	return replaceElement(element, element, props) as React.ReactElement;
}
