import React, { PropTypes } from 'react';
import { Header, Modal, Label } from 'semantic-ui-react';

import './ShowSchedule.css';

const ShowSchedule = (props) => {
  const { hideModal, schedule } = props;

  return (
    <Modal open onClose={hideModal} dimmer="blurring" size="small">
      <Header
        icon="calendar"
        content={
          `Group ${schedule.whom.group.id} - Semigroup ${schedule.whom.semigroup}`
        }
      />
      <Modal.Content>
        <div className="schedule-info">
          <Label className="info-label" color="blue">What</Label>
          <span className="info-text">{schedule.what.course.name}</span>
          <Label className="info-label" color="blue">Type</Label>
          <span className="info-text">{schedule.what.type}</span>
        </div>
        <div className="schedule-info">
          <Label className="info-label" color="blue">With</Label>
          <span className="info-text">
            {`${schedule.who.firstname} ${schedule.who.lastname}`}
          </span>
          <Label className="info-label" color="blue">Email</Label>
          <span className="info-text">{schedule.who.email}</span>
        </div>
        <div className="schedule-info">
          <Label className="info-label" color="blue">When</Label>
          <span className="info-text">{schedule.when.day}</span>
          <Label className="info-label" color="blue">From</Label>
          <span className="info-text">{schedule.when.from}</span>
          <Label className="info-label" color="blue">Until</Label>
          <span className="info-text">{schedule.when.duration}</span>
          <Label className="info-label" color="blue">Weeks</Label>
          <span className="info-text">{schedule.when.frequency}</span>
        </div>
        <div className="schedule-info">
          <Label className="info-label" color="blue">Where</Label>
          <span className="info-text">{schedule.where}</span>
        </div>
      </Modal.Content>

    </Modal>
  );
};

ShowSchedule.propTypes = {
  hideModal: PropTypes.func,
  schedule: PropTypes.object
};

export default ShowSchedule;
