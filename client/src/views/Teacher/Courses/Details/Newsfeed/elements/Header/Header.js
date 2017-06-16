import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

import NewPostFormContainer from './NewPostForm';
import Filter from '../../../../../../../components/Newsfeed/Filter';
import { media } from '../../../../../../../utils/style-utils';

const Header = (props) => {
  const {
    toggle: writePost,
    toggledOn: writingPost,
    selectedCourseTeachingTypes,
    filterNewsfeed
  } = props;

  return (
    <Wrapper writingPost={writingPost}>
      <InfoWrapper>
        {writingPost
          ? <StyledButton
              content="Discard"
              icon="delete"
              labelPosition="right"
              onClick={writePost}
            />
          : <StyledButton
              className="new"
              content="New"
              icon="compose"
              labelPosition="right"
              onClick={writePost}
            />}
        <Filter types={selectedCourseTeachingTypes} onChange={filterNewsfeed} />
      </InfoWrapper>
      {writingPost &&
        <NewPostFormContainer
          className="headerItem"
          hideContainer={writePost}
        />}
    </Wrapper>
  );
};

const { bool, func, shape } = PropTypes;
Header.propTypes = {
  toggle: func.isRequired,
  toggledOn: bool.isRequired,
  selectedCourseTeachingTypes: shape({
    lab: bool,
    lecture: bool,
    seminar: bool,
    project: bool
  }).isRequired,
  filterNewsfeed: func.isRequired
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80%;
`;

const InfoWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledButton = styled(Button)`
	flex: 1;
	max-width: 210px;
	margin: 10px !important;
	height: 2.78em;
	font-size: 14px !important;

	&.new {
		background-color: ${props => props.theme.confirmation} !important;
		color: ${props => props.theme.white} !important;
	}

	${media.phone`
		font-size: 12px !important;
		`}
`;

export default Header;
