import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

const sizes = {
  giant: 1178,
  desktop: 992,
  tablet: 768,
  phone: 376
};

export const media = Object.keys(sizes).reduce(
  (accumulator, label) => {
    const emSize = sizes[label] / 16;
    accumulator[label] = (...args) => css`
		@media (max-width: ${emSize}em) {
			${css(...args)}
		}
	`;
    return accumulator;
  },
  {}
);

export const truncate = width =>
  `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

export const formatMultiLineText = text =>
  text.split('\n').map((item, index) => (
    <span key={item + index}>
      {item}
      <br />
    </span>
  ));
