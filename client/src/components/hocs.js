import React from 'react'; import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

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

export function withMountingTransition(Component) {
  return class TransitionedComponent extends React.Component {
    render() {
      return (
        <CSSTransitionGroup
          transitionName="mount"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Component />
        </CSSTransitionGroup>
      );
    }
  };
}
