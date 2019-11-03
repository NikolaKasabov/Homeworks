module.exports = (req, res, viewToRender, message, params) => {
  res.render(viewToRender, {
    message,
    ...params,
  });
};
