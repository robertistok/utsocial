import Post from '../models/post';

export function getFeedForCourse(req, res, next) {
	const { studentGroupID, teacherID, target: { courseID, lang } } = req.body;

	if (teacherID !== undefined) {
		Post.find({
			'target.course.id': courseID,
			'target.course.lang': lang,
			$and: [
				{ $or: [{ 'target.includeTeachers': true }, { postedBy: teacherID }] }
			]
		})
			.populate([{ path: 'postedBy', select: 'firstname lastname name' }])
			.then((posts) => {
				if (posts === undefined) {
					return res.send({ posts: [] });
				}
				return res.send({ posts });
			})
			.catch(err => next(err));
	} else {
		Post.find({
			'target.course.id': courseID,
			'target.course.lang': lang,
			groups: studentGroupID
		})
			.populate('postedBy')
			.then((posts) => {
				if (posts === undefined) {
					return res.send({ posts: [] });
				}
				return res.send({ posts });
			});
	}
}

export function addPost(req, res, next) {
	const {
		content,
		postedBy,
		target: { course: { id, relatedTo, lang }, includeTeachers, groups }
	} = req.body;

	const newPost = new Post({
		content,
		postedBy,
		target: { course: { id, relatedTo, lang }, includeTeachers, groups }
	});

	newPost
		.save()
		.then(newPost =>
			Post.populate(newPost, [
				{ path: 'postedBy', select: 'firstname lastname name' }
			]).then(newPost => res.send({ newPost }))
		)
		.catch(err => next(err));
}

function updateItem(req, res, next) {}

export function mark(req, res, next) {
	const { postID, userID, type } = req.body;

	Post.findByIdAndUpdate(
		postID,
		{ $addToSet: { [type]: userID } },
		{ safe: true, new: true }
	)
		.then(() =>
			res.status(200).send({ type, postID, userID, message: 'Mark successful' })
		)
		.catch(err => next(err));
}

export function unMark(req, res, next) {
	const { postID, userID, type } = req.body;

	Post.findByIdAndUpdate(
		postID,
		{ $pull: { [type]: [userID] } },
		{ safe: true, new: true }
	)
		.then(() =>
			res
				.status(200)
				.send({ type, postID, userID, message: 'UnMark successful' })
		)
		.catch(err => next(err));
}

export function deletePost(req, res, next) {
	const { postID } = req.params;

	Post.findOneAndRemove({ _id: postID })
		.then((post) => {
			if (!post) {
				return res
					.status(404)
					.send({ id: postID, message: 'Post not found...' });
			}

			return res.status(200).send({ id: postID, message: 'Delete successful' });
		})
		.catch(err => next(err));
}
