import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Message, Dimmer, Loader } from 'semantic-ui-react';

import Table from './Table';
import * as modalActions from '../../../redux/modals';
import * as scheduleActions from '../../../redux/schedule';
import * as groupActions from '../../../redux/groups';
import { withEither, withMaybe } from '../../hocs';

import { MODALS } from '../../../constants';

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  componentDidMount() {
    const {
      schedule: { scheduleOf },
      fetchSchedulesFor
    } = this.props;
    if (scheduleOf !== undefined) {
      fetchSchedulesFor(scheduleOf);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.schedule.scheduleOf !== this.props.schedule.scheduleOf &&
      nextProps.schedule.scheduleOf !== undefined
    ) {
      this.props.fetchSchedulesFor(nextProps.schedule.scheduleOf);
    }
  }

  handleCellClick(event) {
    const schedule = JSON.parse(event.target.getAttribute('data-schedule'));

    const customProps = { schedule };
    this.props.showModal(MODALS.SHOW_SCHEDULE, customProps);
  }

  render() {
    const { schedule: { loading } } = this.props;

    if (loading) {
      return <LoadingIndicator />;
    }

    return <Table {...this.props} handleCellClick={this.handleCellClick} />;
  }
}

const { func, shape, string, bool, array } = React.PropTypes;
TableContainer.propTypes = {
  showModal: func.isRequired,
  fetchSchedulesFor: func.isRequired,
  schedule: shape({
    loading: bool.isRequired,
    semigroup: string.isRequired,
    week: string.isRequired,
    scheduleList: array.isRequired
  }).isRequired
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
const noSelectedGroup = props => props.schedule.scheduleOf === undefined;

const mapStateToProps = state => ({
  schedule: state.schedule
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...modalActions, ...scheduleActions, ...groupActions },
    dispatch
  );

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMaybe(nullConditionFn),
  withEither(noSelectedGroup, NoGroupsSelected)
);

export default enhance(TableContainer);
