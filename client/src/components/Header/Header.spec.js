import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header component', () => {
  const props = {
    links: ['home', 'schedules', 'performance'],
    logOutUser: () => null
  };

  it('should render without crashing', () => {
    shallow(<Header {...props} />);
  });
});