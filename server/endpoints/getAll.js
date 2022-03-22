'use strict';

const { DynamoDB } = require('aws-sdk');
const response = require('../utils/response');
const dynamoDB = new DynamoDB.DocumentClient();

module.exports.getAll = async () => {
  const params = {
    TableName: 'MoviesTable'
  }

  try {
    const allMovies = await dynamoDB.scan(params).promise();
    return response(allMovies, 200)
  }
  catch (error) {
    return response(error.message, 500)
  }
};
