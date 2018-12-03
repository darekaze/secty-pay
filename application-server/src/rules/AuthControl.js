const Joi = require('joi');

module.exports = {
  required(req, res, next) {
    if (!req.body.recaptcha) {
      res.status(403).send({
        error: 'Please enter the reCAPTCHA!',
      });
    } else if (!req.body.credential) {
      res.status(403).send({
        error: 'Credential cannot be empty!',
      });
    } else next();
  },
  validate(req, res, next) {
    const schema = Joi.object().keys({
      fullname: Joi.string(),
      username: Joi.string().alphanum().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/),
    });

    const errorMapping = {
      fullname: 'Name must be characters only',
      username: 'Username can only contain numbers and letters',
      password: 'Password must be at least 8 characters long and not exceeding 32 characters',
    };

    const { error } = Joi.validate(req.body.credential, schema);

    if (error) {
      res.status(400).send({
        error: errorMapping[error.details[0].context.key] || 'Invalid registration information',
      });
    } else next();
  },
};
