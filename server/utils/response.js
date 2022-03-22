const response = (body, statusCode, paramsHeaders) => {
  const headers = paramsHeaders || { 'Content-Type': 'application/json' };

  return {
    body: JSON.stringify(body),
    statusCode,
    headers
  };
};

module.exports = response;