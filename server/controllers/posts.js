import Post from '../models/post';
import Course from '../models/course';
import Student from '../models/student';
import Teacher from '../models/teacher';

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
		}).then((posts) => {
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

	newPost.save().then(newPost => res.send({ newPost })).catch(err => next(err));
}

function updateItem(req, res, next) {}

function deleteItem(req, res, next) {}
