import { theme as _theme } from 'styled-tools';
import _get from 'lodash/get';
import { ThemeConfig } from './types';

export { default as classNames } from 'classnames';
export { default, default as styled } from '@emotion/styled';
export { css as cssClass } from 'emotion';
export { css, keyframes, Global, ThemeContext } from '@emotion/core';
export { withTheme, ThemeProvider } from 'emotion-theming';
export { palette } from 'styled-tools';

export function theme(selector: string) {
  return (props: any) => {
    const localSelector = selector
      .split('.')
      .slice(1)
      .join('.');
    return _get(props, `overrides.${localSelector}`) || _theme(selector)(props);
  };
}

export function space(_scalar: number | string | void, _scaleType: 'minor' | 'major' = 'minor') {
  return (props: { theme: ThemeConfig }) => {
    let scalar = _scalar;
    let scaleType = _scaleType;
    if (!scalar) return 0;
    if (typeof scalar === 'string' && (scalar.includes('minor') || scalar.includes('major'))) {
      // @ts-ignore
      [scaleType, scalar] = scalar.split('-');
      scalar = parseFloat(scalar);
      if (isNaN(scalar)) return 0;
    }
    const unit: number = _get(props, `theme.layout.${scaleType}Unit`);
    const fontSize: number = _get(props, 'theme.global.fontSize');
    return (scalar as number) * (unit / fontSize);
  };
}