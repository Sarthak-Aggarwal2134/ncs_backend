const bcrypt = require('bcrypt');
const User = require('../../../models/user');
const Log = require('../../../middleware/logger');

const createUser = async ({ name, email, password, role }) => {
    try {
        console.log(name, email, password, role)
        Log.debug('createUser API called', 'createUser');

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                status: 400,
                data: {
                    message: 'Account with this email already exists!',
                },
            };
        }

        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);

        console.log(name, email, password, role);
        const newUser = new User({
            name,
            email,
            password,
            role,
        });
        const user = await newUser.save();
        return {
            status: 200,
            data: {
                message: 'User created',
                user: user,
            },
        };
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

module.exports = { createUser };