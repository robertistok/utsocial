const Course = require('../models/course');
const Schedule = require('../models/schedule');

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

	Course.findOne({ _id: id }, 'meta').then((course) => {
		const { meta } = course;

		let required = course.meta.indexOf(meta.find(item => item.lang === lang));

		if (required < 0) {
			course.meta.push({ lang, materials: [{ type, link, description }] });
		} else {
			course.meta[required].materials.push({
				type,
				link,
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
	const { id, lang, materialID, link, description } = req.body;

	Course.findOne({ _id: id }, 'meta').then((course) => {
		const { meta } = course;

		meta[lang] = {
			...meta[lang],
			materials: meta[lang].materials.map(
				material =>
					(material._id === materialID
						? { _id: materialID, link, description }
						: material)
			)
		};

		course.save().then(meta => res.send(meta)).catch(err => next(err));
	});
}

function deleteMaterial(req, res, next) {
	const { id, lang, materialID } = req.body;

	Course.findOne({ _id: id }, 'meta').then((course) => {
		const { meta } = course;

		meta[lang] = {
			...meta[lang],
			materials: meta[lang].materials.filter(
				material => material._id !== materialID
			)
		};

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
