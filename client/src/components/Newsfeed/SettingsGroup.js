import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const SettingsGroup = (props) => {
  const { options } = props;

  return (
    <Wrapper>
      {options.map(({ key, text, icon, onClick }) => (
        <StyledPopup
          key={key}
          trigger={<StyledIcon name={icon} onClick={onClick} />}
          content={text}
          size="mini"
          position="top left"
        />
      ))}
    </Wrapper>
  );
};

const { string, shape, func, arrayOf } = React.PropTypes;
SettingsGroup.propTypes = {
  options: arrayOf(
    shape({
      key: string.isRequired,
      text: string.isRequired,
      icon: string.isRequired,
      onClick: func
    }).isRequired
  ).isRequired
};

const Wrapper = styled.div`
	position: absolute;
	align-self: flex-end;
	display: flex;
	flex-direction: row;
	margin-right: 10px;
	top: -22px;
`;

const StyledIcon = styled(Icon)`
	margin-bottom: 5px !important;
	color: rgba(0,0,0,.23) !important;
	transition-duration: 0.3s;
	transition-timing-function: ease-out;

	&:hover {
		color: #000000 !important;
		cursor: pointer;
		transform: translateY(-4px);
	}
`;

const StyledPopup = styled(Popup)`
	max-height: min-content !important;
`;

export default SettingsGroup;
