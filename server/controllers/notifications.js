import Notification from '../models/notification';

export function fetch(req, res) {
	const { userID, groupID } = req.body;

	Notification.find({
		$or: [
			{ 'target.groups': groupID },
			{ 'target.students': userID },
			{ 'target.teachers': userID }
		]
	})
		.limit(30)
		.populate([
			{ path: 'triggeredBy', select: 'firstname lastname name' },
			{ path: 'target.course.id', select: 'name' }
		])
		.then((notifications) => {
			if (notifications === undefined) {
				return res.status(204).send({ notifications: [] });
			}

			return res.status(200).send({
				notifications: notifications.sort(
					(n1, n2) => n2.timestamp - n1.timestamp
				)
			});
		})
		.catch(() => res.status(500).send('Internal server error'));
}

export function markAsSeen(req, res) {
	const { userID, groupID } = req.body;

	Notification.updateMany(
		{
			seenBy: { $ne: userID },
			$or: [
				{ 'target.groups': groupID },
				{ 'target.students': userID },
				{ 'target.teachers': userID }
			]
		},
		{ $push: { seenBy: userID } }
	)
		.then(() => res.status(200).send('All notifications marked as seen'))
		.catch(() => res.status(500).send('Internal server error'));
}
