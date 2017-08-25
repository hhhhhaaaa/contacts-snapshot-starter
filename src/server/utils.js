const renderError = function(error, response){
  response.send(`ERROR: ${error.message}\n\n${error.stack}`);
};

module.exports = {renderError};
