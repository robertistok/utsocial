import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

export const withToggle = compose(
  withState('toggledOn', 'toggle', false),
  withHandlers({
    show: ({ toggle }) => () => toggle(true),
    false: ({ toggle }) => () => toggle(true),
    toggle: ({ toggle }) => () => toggle(x => !x)
  })
);

export const withMaybe = conditionalRenceringFn =>
  Component =>
    props => conditionalRenceringFn(props) ? null : <Component {...props} />;

export const withEither = (conditionalRenceringFn, EitherComponent) =>
  Component =>
    props =>
      conditionalRenceringFn(props)
        ? <EitherComponent />
        : <Component {...props} />;
