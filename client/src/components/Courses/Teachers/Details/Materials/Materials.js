import React from 'react';
import { Accordion, Segment, Message } from 'semantic-ui-react';

import MaterialType from './elements/MaterialType';

const Materials = (props) => {
  const {
    toggledOn,
    toggle,
    selectedCourse: { course }
  } = props;

  return (
    <div>
      <Accordion.Title
        onClick={toggle}
        active={toggledOn}
        content="Materials"
      />

      <Accordion.Content active={toggledOn}>

        {course.teachingTypes !== undefined &&
          Object.keys(course.teachingTypes)
					.filter(type => course.teachingTypes[type] === true)
					.map(type => <MaterialType key={type} type={type} />)}

      </Accordion.Content>
    </div>
  );
};

export default Materials;
