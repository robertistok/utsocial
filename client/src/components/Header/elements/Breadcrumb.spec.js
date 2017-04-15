import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumbs from './Breadcrumb';

describe('Breadcrumb', () => {
  it('should render without crashing', () => {
    shallow(<Breadcrumbs />);
  });
});
