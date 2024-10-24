const getIndexAPI = (req, res) => {
  res.status(200).json({
    status: {
      code: 200,
      message: "Success fetching the API",
    },
    data: null,
  });
};

module.exports = {
  getIndexAPI,
};
