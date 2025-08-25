export default (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ msg: err.message || "Server error" });
};
