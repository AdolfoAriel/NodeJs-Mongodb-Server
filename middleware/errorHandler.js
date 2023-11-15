const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Falied",
        Message: err.message,
        strackTrace: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        Message: err.message,
        strackTrace: err.stack,
      });
      break;
    case constants.UNAUNTHORIXED:
      res.json({
        title: "Unauthorized",
        Message: err.message,
        strackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        Message: err.message,
        strackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        Message: err.message,
        strackTrace: err.stack,
      });
      console.log("No error, all good");
      break;
  }
};

module.exports = errorHandler;
