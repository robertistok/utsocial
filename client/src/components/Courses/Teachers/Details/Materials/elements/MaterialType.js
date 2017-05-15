import React from 'react';
import { Segment, Message } from 'semantic-ui-react';
import styled from 'styled-components';

import {
  capitalizeFirstLetter
} from '../../../../../../utils/string-operations';
import plusIcon from '../../../../../../../public/plus.svg';

const MaterialType = (props) => {
  const { type } = props;
  const items = [];

  return (
    <Segment>
      <Message>
        <Message.Header>
          {capitalizeFirstLetter(type)}
          {' '}
          <Icon src={plusIcon} onClick={() => console.log('amen')} />
        </Message.Header>
        <Message.List items={items} />
      </Message>
    </Segment>
  );
};

const Icon = styled.img`
	display: inline-block;
	height: 14px;
	width: 14px;
	margin-right: 10px;
`;

export default MaterialType;
