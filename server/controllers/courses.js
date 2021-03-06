// disallow rule in favor of updating
/* eslint no-param-reassign: 0*/

import Course from '../models/course';
import Schedule from '../models/schedule';

export function checkIfHttp(url) {
	const pattern = /^((http|https|ftp):\/\/)/;

	if (!pattern.test(url)) {
		return `http://${url}`;
	}

	return url;
}

export function getCourseGroups(req, res, next) {
	const { lang, courseID } = req.params;
	Promise.all([
		Schedule.find({ 'what.course': courseID }, [
			'whom.group',
			'when',
			'what.type'
		]).populate({
			path: 'whom.group',
			select: 'id lang',
			match: { lang }
		}),
		Course.findOne({ _id: courseID })
	])
		.then((values) => {
			const [schedules, course] = values;
			const filteredSchedules = schedules.filter(
				scheduleItem => scheduleItem.whom.group !== null
			);
			const groups = filteredSchedules.reduce((acc, scheduleItem) => {
				if (
					acc.length === 0 ||
					acc.find(item => item.id === scheduleItem.whom.group.id) === undefined
				) {
					return [
						...acc,
						{
							id: scheduleItem.whom.group.id,
							_id: scheduleItem.whom.group._id
						}
					];
				}
				return acc;
			}, []);

			res.send({
				groups,
				course,
				schedules: filteredSchedules.map(item => ({
					whom: item.whom.group._id,
					type: item.what.type,
					frequency: item.when.frequency,
					day: item.when.day
				}))
			});
		})
		.catch(err => next(err));
}

export function getAll(req, res, next) {
	Course.find({}).then(courses => res.send(courses)).catch(err => next(err));
}

export function getMetaData(req, res, next) {
	const { courseID, lang } = req.params;

	Course.findOne({ _id: courseID }, 'meta')
		.populate({
			path: 'meta.description.lastUpdatedBy',
			select: 'firstname lastname name'
		})
		.then((course) => {
			const { meta } = course;

			const required = course.meta.indexOf(
				meta.find(item => item.lang === lang)
			);

			if (required < 0) {
				return res.send({ materials: [], description: { text: '' } });
			}

			return res.send({
				materials: course.meta[required].materials,
				description: course.meta[required].description
			});
		})
		.catch(err => next(err));
}

export function addMaterial(req, res, next) {
	const { id, lang, type, link, description } = req.body;
	const checkedLink = checkIfHttp(link);
	const newMaterial = {
		type,
		link: checkedLink,
		description,
		enteredOn: Date.now()
	};
	let required;

	Course.findOne({ _id: id }, 'meta')
		.then((course) => {
			const { meta } = course;

			required = course.meta.indexOf(meta.find(item => item.lang === lang));

			if (required < 0) {
				course.meta.push({
					lang,
					materials: [newMaterial]
				});
				required = course.meta.indexOf(meta.find(item => item.lang === lang));
			} else {
				course.meta[required].materials.push(newMaterial);
			}

			return course.save();
		})
		.then(course =>
			res.send({
				newMaterial: course.meta[required].materials.slice(-1).pop()
			})
		)
		.catch(err => next(err));
}

export function updateMaterial(req, res, next) {
	const { courseID, lang, materialID, link, description } = req.body;
	let required;

	Course.findOne({ _id: courseID })
		.then((course) => {
			const { meta } = course;

			required = meta.indexOf(meta.find(item => item.lang === lang));

			course.meta[required].materials = course.meta[required].materials.map(
				material =>
					(String(material._id) === materialID
						? {
								_id: materialID,
								type: material.type,
								link,
								description,
								enteredOn: Date.now()
							}
						: material)
			);

			return course.save();
		})
		.then(course =>
			res.send(
				course.meta[required].materials.find(
					material => String(material._id) === materialID
				)
			)
		)
		.catch(err => next(err));
}

export function deleteMaterial(req, res, next) {
	const { id, lang, materialID } = req.body;

	Course.findOne({ _id: id }, 'meta')
		.then((course) => {
			const { meta } = course;

			const required = meta.indexOf(meta.find(item => item.lang === lang));

			course.meta[required].materials = course.meta[required].materials.filter(
				material => String(material._id) !== materialID
			);

			return course.save();
		})
		.then(() => res.send({ message: 'success' }))
		.catch(err => next(err));
}

export function updateDescription(req, res, next) {
	const { courseID, lang, text, updatedBy } = req.body;
	let required;

	const updatedDescription = {
		text,
		lastUpdatedBy: updatedBy,
		updatedOn: Date.now()
	};

	Course.findOne({ _id: courseID })
		.then((course) => {
			required = course.meta.indexOf(
				course.meta.find(item => item.lang === lang)
			);

			if (required < 0) {
				course.meta.push({
					lang,
					description: updatedDescription
				});
				required = course.meta.indexOf(
					course.meta.find(item => item.lang === lang)
				);
			} else {
				course.meta[required].description = updatedDescription;
			}

			return course.save();
		})
		.then(course => res.send(course.meta[required].description))
		.catch(err => next(err));
}
