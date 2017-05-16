const Course = require('../models/course');
const Schedule = require('../models/schedule');

function checkIfHttp(url) {
	const pattern = /^((http|https|ftp):\/\/)/;

	if (!pattern.test(url)) {
		return `http://${url}`;
	}

	return url;
}

function getCourseGroups(req, res, next) {
	const { lang, courseID } = req.params;
	Schedule.find({ 'what.course': courseID }, [
		'whom.group',
		'when',
		'what.type'
	])
		.populate({
			path: 'whom.group',
			select: 'id lang',
			match: { lang }
		})
		.then((schedules) => {
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

function getMetaData(req, res, next) {
	const { courseID, lang } = req.params;

	Course.findOne({ _id: courseID }, 'meta')
		.then((course) => {
			const { meta } = course;

			const required = course.meta.indexOf(
				meta.find(item => item.lang === lang)
			);

			if (required < 0) {
				return res.send({ materials: [], description: '' });
			}

			return res.send({
				materials: course.meta[required].materials,
				description: course.meta[required].description
			});
		})
		.catch(err => next(err));
}

function addMaterial(req, res, next) {
	const { id, lang, type, link, description } = req.body;

	const checkedLink = checkIfHttp(link);

	Course.findOne({ _id: id }, 'meta').then((course) => {
		const { meta } = course;

		let required = course.meta.indexOf(meta.find(item => item.lang === lang));

		if (required < 0) {
			course.meta.push({
				lang,
				materials: [{ type, link: checkedLink, description }]
			});
		} else {
			course.meta[required].materials.push({
				type,
				link: checkedLink,
				description
			});
		}

		required = course.meta.indexOf(meta.find(item => item.lang === lang));

		course
			.save()
			.then(course =>
				res.send({
					newMaterial: course.meta[required].materials.slice(-1).pop()
				})
			)
			.catch(err => next(err));
	});
}

function updateMaterial(req, res, next) {
	const { courseID, lang, materialID, link, description } = req.body;

	Course.findOne({ _id: courseID }).then((course) => {
		const { meta } = course;

		const required = meta.indexOf(meta.find(item => item.lang === lang));

		course.meta[required].materials = course.meta[required].materials.map(
			material =>
				(String(material._id) === materialID
					? {
							_id: materialID,
							type: material.type,
							link,
							description,
							enteredOn: Date.Now
						}
					: material)
		);

		course
			.save()
			.then(course =>
				res.send(
					course.meta[required].materials.find(
						material => String(material._id) === materialID
					)
				)
			)
			.catch(err => next(err));
	});
}

function deleteMaterial(req, res, next) {
	const { id, lang, materialID } = req.body;

	Course.findOne({ _id: id }, 'meta').then((course) => {
		const { meta } = course;

		const required = meta.indexOf(meta.find(item => item.lang === lang));

		course.meta[required].materials = course.meta[required].materials.filter(
			material => String(material._id) !== materialID
		);

		course
			.save()
			.then(() => res.send({ message: 'success' }))
			.catch(err => next(err));
	});
}

module.exports = {
	getCourseGroups,
	getMetaData,
	addMaterial,
	updateMaterial,
	deleteMaterial
};
