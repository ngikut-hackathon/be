const getIndexPage = (req, res) => {
  res.render("admin/pages/dashboard/index");
};

module.exports = {
  getIndexPage,
};
