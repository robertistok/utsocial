import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Accordion } from 'semantic-ui-react';

import DescriptionBox from '../../../elements/Description/Box';
import * as metadatacourseActions from '../../../../../redux/metadatacourse';
import { withToggle } from '../../../../hocs';
import { StyledAccordionTitle } from '../../../elements/styled-components';

const DescriptionContainer = (props) => {
  const { toggle, toggledOn, description } = props;

  return (
    <div>
      <StyledAccordionTitle
        onClick={toggle}
        active={toggledOn}
        content="Description"
      />

      {toggledOn &&
        <Accordion.Content active>
          <DescriptionBox {...description} />
        </Accordion.Content>}
    </div>
  );
};
const { bool, func, string, shape } = React.PropTypes;
DescriptionContainer.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
  description: shape({
    text: string.isRequired,
    lastUpdatedBy: shape({ name: string.isRequired }),
    updatedOn: string
  })
};

const mapStateToProps = state => ({
  description: state.metadatacourse.description
});

const mapDispatchToprops = dispatch =>
  bindActionCreators({ ...metadatacourseActions }, dispatch);

const enhance = compose(
  withToggle,
  connect(mapStateToProps, mapDispatchToprops)
);

export default enhance(DescriptionContainer);
