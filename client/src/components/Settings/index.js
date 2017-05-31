import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import PasswordContainer from './elements/Password/';
import AccountContainer from './elements/Account/';
import * as preferencesActions from '../../redux/account/preferences';
import { withMountingTransition } from '../hocs';

class Settings extends Component {
  componentWillUnmount() {
    const { resetPreferencesState } = this.props;

    resetPreferencesState();
  }

  render() {
    return (
      <Wrapper>
        <PasswordContainer /><AccountContainer />
      </Wrapper>
    );
  }
}

const { func } = PropTypes;
Settings.propTypes = {
  resetPreferencesState: func.isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...preferencesActions }, dispatch);

const enhance = compose(
  withMountingTransition,
  connect(null, mapDispatchToProps)
);

export default enhance(Settings);
