const service = require('../services/createUser');
const Log = require('../../../middleware/logger');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!email) {
            Log.debug(
                `The email is required to sign in.`,
                'login'
            );
            res.status(400).json({
                errorCode: 400,
                errorMessage: 'Email is required',
            });
            return;
        }

        if (!password) {
            Log.debug(
                `The password is required to sign in.`,
                'login'
            );
            res.status(400).json({
                errorCode: 400,
                errorMessage: 'Password is required',
            });
            return;
        }

        const response = await service.createUser({
            name, email, password, role
        });

        console.log(response);
        Log.info(response.data, 'createUser');
        res.status(response.status || 200).json(response.data);
    } catch (error) {
        Log.error(error, 'createUser');
        res.status(400).json({
            erroeCode: 400,
            errorMessage: 'User not found',
        });
    }
};

module.exports = {
    createUser,
};
