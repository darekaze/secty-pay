const config = require('../config');

module.exports = {
  async charging(req, res) {
    try {
      // payment logic here (verify is done in middleware)
      console.log(req.body);
      res.send({ success: true });
    } catch (err) {
      res.status(400).send({
        error: 'Sonthing went wrong to do the actual payment...',
      });
    }
  },
};
