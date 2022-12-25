// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(error);
  res.status(500).json({
    status: 'failed',
    message: 'internal server error',
  });
};
