import React from 'react';

const Student = props => (
		<div>
			I'm a proud student with the username of {props.auth.user.username}
		</div>
	);

export default Student;
