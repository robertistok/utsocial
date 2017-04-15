import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import styled from 'styled-components';

import { capitalizeFirstLetter } from '../../../utils/string-operations';

const StyledBreadcrumb = styled(Breadcrumb)`
	height: 30px;
	width: 100%;
	background-color: #3F51B5;
	color: #FFFFFF;
	padding: 7.5px 10px;
`;

const Breadcrumbs = (props) => {
  const { location } = props;

  const getBreadCrumbItems = () => {
    const splittedPath = location.pathname
      .split('/')
      .filter(path => path.length !== 0);

    return splittedPath.map((path, index) => {
      const section = {
        key: path,
        content: capitalizeFirstLetter(path)
      };
      if (splittedPath.length - 1 === index) {
        section.active = true;
        return section;
      }
      section.as = Link;
      section.to = path;
      return section;
    });
  };

  return (
    <StyledBreadcrumb icon="right angle" sections={getBreadCrumbItems()} />
  );
};

const BreadcrumbsWithRouter = withRouter(Breadcrumbs);

export default BreadcrumbsWithRouter;
