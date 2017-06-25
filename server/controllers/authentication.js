// disallow rule in favor of updating
/* eslint no-param-reassign: 0*/

import crypto from 'crypto';
import nodemailer from 'nodemailer';

import { tokenForUser, getCleanUser } from '../utils/index';
import User from '../models/user';

export function signIn(req, res) {
	getCleanUser(req.user)
		.then((user) => {
			res.status(200).send({ token: tokenForUser(req.user), user });
		})
		.catch(() => res.status(500).send('Server unavailable'));
}

export function meFromToken(req, res) {
	getCleanUser(req.user)
		.then((user) => {
			res.status(200).send({ user });
		})
		.catch(() => res.status(500).send('Server unavailable'));
}

export function validateEmailAddress(req, res) {
	const { email } = req.params;

	User.findOne({ email })
		.then((user) => {
			if (!user) {
				return res.status(404).send('No account with this email address found');
			}

			return res.status(200).send('Email found');
		})
		.catch(err =>
			res.status(500).send({ message: 'Internal server error', err })
		);
}

export function forgotPassword(req, res) {
	const { email } = req.body;
	crypto.randomBytes(20, (err, buffer) => {
		const token = buffer.toString('hex');

		User.findOne({ email })
			.then((user) => {
				if (!user) {
					return res
						.status(404)
						.send('No account with this email address found');
				}

				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000;

				return user.save();
			})
			.then((user) => {
				const mailService = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.UTSOCIAL_USER,
						pass: process.env.UTSOCIAL_PASS
					}
				});

				const mailOptions = {
					to: user.email,
					from: 'utsocial18@gmail.com',
					subject: 'UTSocial password reset',
					text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://'}localhost:3000/reset/${token}\n\n` +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n'
				};

				return mailService.sendMail(mailOptions);
			})
			.then(() =>
				res.status(200).send({
					token,
					message: `An email has been sent to ${email} with further instructions`
				})
			)
			.catch(err =>
				res.status(500).send({ message: 'Internal server error', err })
			);
	});
}

export function checkValidityOfToken(req, res) {
	const { token } = req.params;

	User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() }
	}).then((user) => {
		if (!user) {
			return res
				.status(404)
				.send('Password reset token is invalid or has expired.');
		}

		return res.status(200).send('Token is valid');
	});
}

export function resetForgottenPassword(req, res) {
	const { token, newPassword, verifyNewPassword } = req.body;

	if (newPassword !== verifyNewPassword) {
		return res.status(406).send('Passwords does not match');
	}

	return User.findOne({
		resetPasswordToken: token,
		resetPasswordExpires: { $gt: Date.now() }
	})
		.then((user) => {
			if (!user) {
				return res
					.status(404)
					.send('Password reset token is invalid or has expired.');
			}

			user.password = newPassword;
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;

			return user.save();
		})
		.then(user => getCleanUser(user))
		.then(cleanUser =>
			res.status(200).send({
				token: tokenForUser(cleanUser),
				user: cleanUser,
				message: 'Your password was changed succesfully, you can now sign in.'
			})
		)
		.catch(() => res.status(500).send('Server unavailable'));
}
