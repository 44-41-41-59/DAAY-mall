module.exports = (err, req, res, next) => {
  res.status(err.status);
  res.statusMessage = 'Server Error :(';
  res.json({ error: err.message });
};
