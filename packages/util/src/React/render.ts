import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';

const fullClone = {
	...ReactDOM,
} as typeof ReactDOM & {
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
		usingClientEntryPoint?: boolean;
	};
	createRoot: CreateRoot;
};

const MARK = '__rc_react_root__';

const { version } = fullClone;
type CreateRoot = (container) => Root;

let createRoot: CreateRoot;

try {
	const mainVersion = Number((version || '').split('.')[0]);
	if (mainVersion >= 18) {
		({ createRoot } = fullClone);
	}
} catch (e) {
	console.log('e', e);
}

function toggleWarning(skip: boolean) {
	const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = fullClone;

	if (
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
		typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object'
	) {
		__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint =
			skip;
	}
}

function modernRender(node: React.ReactElement, container) {
	toggleWarning(true);
	const root = container[MARK] || createRoot(container);
	toggleWarning(false);
	root.render(node);
}

function modernUnmount(container) {
	return Promise.resolve().then(() => {
		if (container[MARK]) {
			container[MARK].unmount();
			delete container[MARK];
		}
	});
}

export function render(node: React.ReactElement, container) {
	if (!!createRoot) {
		modernRender(node, container);
		return;
	}
}

export function unmount(container) {
	if (!!createRoot) {
		return modernUnmount(container);
	}
}
