import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Message, Dimmer, Loader } from 'semantic-ui-react';

import Table from './Table';
import * as modalActions from '../../../redux/modals';
import * as scheduleActions from '../../../redux/schedule';
import { withEither, withMaybe } from '../../HOCs/ConditionalRendering';

import { MODALS } from '../../../constants';

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(event) {
    const schedule = JSON.parse(event.target.getAttribute('data-schedule'));

    const customProps = { schedule };
    this.props.showModal(MODALS.SHOW_SCHEDULE, customProps);
  }

  render() {
    return <Table {...this.props} handleCellClick={this.handleCellClick} />;
  }
}

TableContainer.propTypes = {
  schedule: PropTypes.object
};

const NoGroupsSelected = () => (
  <Message
    header="No groups selected"
    content="Select a group from the dropdown list below in order to check its schedule"
  />
);

const LoadingIndicator = () => (
  <Dimmer active>
    <Loader>Loading..</Loader>
  </Dimmer>
);

const nullConditionFn = props => !props.schedule;
const isLoading = props => props.schedule.loading;
const noSelectedGroup = props => props.schedule.group === undefined;

const withConditionalRendering = compose(
  withEither(isLoading, LoadingIndicator),
  withMaybe(nullConditionFn),
  withEither(noSelectedGroup, NoGroupsSelected)
);

const TableContainerWithConditionalRendering = withConditionalRendering(
  TableContainer
);

const mapStateToProps = state => ({
  schedule: state.schedule
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...modalActions, ...scheduleActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  TableContainerWithConditionalRendering
);
