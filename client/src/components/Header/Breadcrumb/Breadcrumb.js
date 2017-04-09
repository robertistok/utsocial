import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';

import { capitalizeFirstLetter } from '../../../utils/string-operations';

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

  return <Breadcrumb icon="right angle" sections={getBreadCrumbItems()} />;
};

const BreadcrumbsWithRouter = withRouter(Breadcrumbs);

export default BreadcrumbsWithRouter;
