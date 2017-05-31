import React from 'react'; import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Materials from './Materials';

const MaterialsContainer = props => <Materials {...props} />;

const mapStateToProps = state => ({
  selectedCourse: state.courses.selectedCourse,
  materials: state.metadatacourse.materials
});

export default connect(mapStateToProps)(MaterialsContainer);
