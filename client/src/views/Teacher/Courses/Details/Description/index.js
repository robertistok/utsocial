import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Accordion } from 'semantic-ui-react';

import DescriptionBox from './DescriptionBox';
import * as metadatacourseActions from '../../../../../redux/metadatacourse';
import { withToggle } from '../../../../../components/hocs';
import {
  StyledAccordionTitle
} from '../../../../../components/Courses/styled-components';

const DescriptionContainer = (props) => {
  const { toggle, toggledOn } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Description"
      />

      {toggledOn &&
        <Accordion.Content active>
          <DescriptionBox />
        </Accordion.Content>}
    </div>
  );
};
const { bool, func } = PropTypes;
DescriptionContainer.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired
};

const mapStateToProps = state => ({
  loggedInUser: state.account.auth.user,
  selectedCourse: state.courses.selectedCourse,
  description: state.metadatacourse.description
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(DescriptionContainer);
