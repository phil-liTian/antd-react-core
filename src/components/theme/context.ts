import React from 'react';
import type { Theme } from '@ant-design/cssinjs';
import { createTheme } from '@ant-design/cssinjs';
import type { SeedToken, MapToken } from './interface';
import defaultDerivative from './themes/default';

export interface DesignTokenProviderProps {
	theme?: Theme<SeedToken, MapToken>;
}

export const defaultTheme = createTheme(defaultDerivative);

export const DesignTokenContext = React.createContext<DesignTokenProviderProps>(
	{}
);
