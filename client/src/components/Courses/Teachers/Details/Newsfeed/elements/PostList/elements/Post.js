import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Popup } from 'semantic-ui-react';

import { formatTime } from '../../../../../../../../utils/timestamp';
import {
  capitalizeFirstLetter
} from '../../../../../../../../utils/string-operations';
import {
  media,
  formatMultiLineText
} from '../../../../../../../../utils/style-utils';
import SettingsGroup from './SettingsGroup';
import { withToggle } from '../../../../../../../hocs';
import ContentEditableDiv from '../../../../elements/ContentEditableDiv';

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
      <Wrapper>
        <Header>
          {!isOwner && isNew && <span>New</span>}
          {edited !== undefined &&
            <StyledPopup
              trigger={<span>Edited</span>}
              content={`Edited at ${formatTime(edited)}`}
              size="mini"
              position="top left"
            />}
          <SettingsGroup options={this.assignOptions()} />
          <Author>{postedBy.name}</Author>
          <RelatedTo>
            {capitalizeFirstLetter(target.course.relatedTo)}
          </RelatedTo>
          <Timestamp>@{formatTime(created)}</Timestamp>
        </Header>
        <Content>
          {this.state.editing
            ? <ContentEditableDiv
                text={this.state.content}
                onContentChange={this.onContentChange}
              />
            : formatMultiLineText(content)}
        </Content>
        {this.state.editing &&
          <ActionButtonGroup>
            <ActionButton onClick={() => updatePost(this.state.content)}>
              Ok
            </ActionButton>
            <ActionButton onClick={this.cancelEdit}>Cancel</ActionButton>

          </ActionButtonGroup>}
      </Wrapper>
    );
  }
}

const { func, bool, string, shape, oneOfType } = React.PropTypes;
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
	background-color: #FFFFFF;
	box-shadow: 0 3px 5px rgba(0,0,0,.23)
	height: min-content;
	margin-bottom: 40px;
	width: 100%;

`;

const Header = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 10px 0px 10px;
	border-bottom: 0.2px solid rgba(0,0,0,.23);
`;

const Content = styled.div`
	height: min-content;
	padding: 10px;
`;

const Author = styled.span`
	display: inline-block;
	width: 150px;
	margin-bottom: 5px
`;

const RelatedTo = styled.span`
	display: inline-block;
	margin-bottom: 5px
`;

const Timestamp = styled.span`
	display: inline-block;
	margin-bottom: 5px;
`;

const ActionButtonGroup = styled.div`
	width: 100%;
	height: 30px;
	position: relative;
	display: flex;
	justify-content: flex-end;
`;

const ActionButton = styled(Button)`
	width: min-content;
	margin: 5px !important;
	height: 20px;
	font-size: 10px !important;

	${media.phone`
		font-size: 10px !important;
		`}
`;

const StyledPopup = styled(Popup)`
	max-height: min-content !important;
`;

export default withToggle(Post);
