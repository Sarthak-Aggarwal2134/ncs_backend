const User = require('../../../models/user');
const Log = require('../../../middleware/logger');
const bcrypt = require('bcrypt');

const login = async (email, password) => {
	try {
		Log.debug('login API called', 'login');
		const user = await User.findOne({ email });
		if (user) {
			const result = bcrypt.compare(password, user.password);
			if (result) {
				Log.debug('User found', 'login');
				return {
					status: 200,
					data: {
						message: 'User found',
					},
				};
			} else {
				Log.debug('Password is incorrect', 'login');
				return {
					status: 400,
					data: {
						errorCode: 400,
						errorMessage: 'Password is incorrect',
					},
				};
			}
		} else {
			Log.debug('User not found', 'login');
			return {
				status: 400,
				data: {
					errorCode: 400,
					errorMessage: 'User not found',
				},
			};
		}
	} catch (error) {
		Log.error(error.message, 'login')
		return {
			status: 500,
			data: {
				errorCode: 500,
				errorMessage: 'Internal server error',
			},
		};
	}
};

module.exports = { login };