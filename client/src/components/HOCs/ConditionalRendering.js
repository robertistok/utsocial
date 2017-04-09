import React from 'react';

export const withMaybe = conditionalRenceringFn =>
  Component =>
    props => conditionalRenceringFn(props) ? null : <Component {...props} />;

export const withEither = (conditionalRenceringFn, EitherComponent) =>
  Component =>
    props =>
      conditionalRenceringFn(props)
        ? <EitherComponent />
        : <Component {...props} />;
