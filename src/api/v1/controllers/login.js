const service = require('../services/login');
const Log = require('../../../middleware/logger');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    const response = await service.login(email, password);
    res.send(response);
    // res.status(response.status || 200).json(response.data);
  
  } catch (error) {
    Log.error(error, 'login');
    res.status(400).json({
      erroeCode: 400,
      errorMessage: 'User not found',
    });
  }
};

module.exports = {
  login,
};
