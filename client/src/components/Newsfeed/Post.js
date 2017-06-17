import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled from 'styled-components';
import { Button, Popup } from 'semantic-ui-react';
import enhanceWithClickOutside from 'react-click-outside';

import { formatTime } from '../../utils/timestamp';
import { capitalizeFirstLetter } from '../../utils/string-operations';
import { media, formatMultiLineText } from '../../utils/style-utils';
import SettingsGroup from '../common/SettingsGroup';
import { withToggle } from '../hocs';
import ContentEditableDiv from '../common/ContentEditableDiv';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = { editing: false, content: this.props.content };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  onContentChange(e) {
    this.state = { content: e.target.innerText.trim() };
  }

  cancelEdit() {
    this.setState((state, props) => ({
      editing: false,
      content: props.content
    }));
  }

  toggleEdit() {
    this.setState(state => ({ editing: !state.editing }));
  }

  handleClickOutside() {
    const { editing } = this.state;

    if (editing === true) {
      this.cancelEdit();
    }
  }

  assignOptions() {
    const {
      isOwner,
      deletePost,
      markSeen,
      unMarkSeen,
      markImportant,
      unMarkImportant
    } = this.props;

    let options = [];

    if (!isOwner) {
      if (unMarkSeen !== undefined) {
        options = [
          ...options,
          {
            key: 'hide',
            icon: 'hide',
            text: 'Mark as unseen',
            onClick: unMarkSeen
          }
        ];
      } else {
        options = [
          ...options,
          {
            key: 'unhide',
            icon: 'unhide',
            text: 'Mark as seen',
            onClick: markSeen
          }
        ];
      }
    }

    if (markImportant !== undefined) {
      options = [
        ...options,
        {
          key: 'sticky note outline',
          icon: 'sticky note outline',
          text: 'Mark as important',
          onClick: markImportant
        }
      ];
    } else {
      options = [
        ...options,
        {
          key: 'sticky note',
          icon: 'sticky note',
          text: 'Mark as not important',
          onClick: unMarkImportant
        }
      ];
    }

    if (deletePost !== undefined) {
      options = [
        ...options,
        { key: 'edit', icon: 'edit', text: 'Edit', onClick: this.toggleEdit },
        {
          key: 'delete',
          icon: 'delete',
          text: 'Remove',
          onClick: deletePost
        }
      ];
    }

    return options;
  }

  render() {
    const {
      edited,
      updatePost,
      created,
      postedBy,
      isOwner,
      target,
      content,
      isNew
    } = this.props;

    return (
      <Wrapper newPost={!isOwner && isNew}>
        <Header>
          {!isOwner && isNew && <NewPostLabel>NEW</NewPostLabel>}
          <SettingsGroup options={this.assignOptions()} />
          <Author>{postedBy.name}</Author>
          <RelatedTo>
            {capitalizeFirstLetter(target.course.relatedTo)}
          </RelatedTo>
          {edited !== undefined &&
            <StyledPopup
              trigger={<EditLabel>Edited</EditLabel>}
              content={`Edited at ${formatTime(edited)}`}
              size="mini"
              position="top left"
            />}
          <Timestamp>{formatTime(created, true)}</Timestamp>
        </Header>
        <Content editing={this.state.editing}>
          {this.state.editing
            ? <ContentEditableDiv
                text={this.state.content}
                onContentChange={this.onContentChange}
              />
            : formatMultiLineText(content)}
        </Content>
        {this.state.editing &&
          <ActionButtonGroup>
            <ActionButton onClick={this.cancelEdit}>Cancel</ActionButton>
            <ActionButton
              className="confirmation"
              onClick={() => updatePost(this.state.content)}
            >
              OK
            </ActionButton>
          </ActionButtonGroup>}
      </Wrapper>
    );
  }
}

const { func, bool, string, shape, oneOfType } = PropTypes;
Post.propTypes = {
  deletePost: func,
  updatePost: oneOfType([func, bool]),
  markSeen: func,
  unMarkSeen: func,
  markImportant: func,
  unMarkImportant: func,
  content: string.isRequired,
  isOwner: bool.isRequired,
  target: shape({
    course: shape({
      id: string.isRequired,
      lang: string.isRequired,
      relatedTo: string.isRequired
    }).isRequired,
    includeTeachers: bool.isRequired
  }).isRequired,
  created: string.isRequired,
  isNew: bool.isRequired,
  edited: string,
  postedBy: shape({
    _id: string.isRequired,
    name: string.isRequired
  }).isRequired
};

const Wrapper = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background-color: ${props => props.newPost ? props.theme.newNotification : props.theme.white};
	box-shadow: 0 3px 5px rgba(0,0,0,.23)
	height: min-content;
	margin-bottom: 45px;
	width: 100%;
`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 10px;
	border-bottom: 0.2px solid rgba(0,0,0,.23);
`;

const Content = styled.div`
	height: min-content;
	padding: ${props => !props.editing && '10px'};
`;

const Author = styled.span`
	display: inline-block;
	width: 150px;
	font-size: 15px;
	font-weight: bold;
`;

const RelatedTo = styled.span`;
 	display: inline - block;
 `;

const Timestamp = styled.span`
	display: inline-block;
	font-size: 11px;
	font-weight: lighter;
`;

const ActionButtonGroup = styled.div`
	width: 100%;
	height: 35px;
	position: relative;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
`;

const ActionButton = styled(Button)`
	width: 50px;
	margin: 7px !important;
	height: 25px;
	font-size: 10px !important;

	&.confirmation {
		background-color: ${props => props.theme.confirmation} !important;
		color: ${props => props.theme.white} !important;
	}

	${media.phone`
		font-size: 10px !important;
		`}
`;

const StyledPopup = styled(Popup)`
	max-height: min-content !important;
`;

const NewPostLabel = styled.span`
	position: absolute;
	top: -22px;
	left: 10px;
	font-size: 15px;
	font-weight: bolder;
`;

const EditLabel = styled.span`
	font-size: 12px;
`;

const enhance = compose(withToggle, enhanceWithClickOutside);

export default enhance(Post);
