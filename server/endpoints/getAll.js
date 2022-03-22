'use strict';

const { DynamoDB } = require('aws-sdk');
const dynamoDB = new DynamoDB.DocumentClient();

module.exports.getAll = async () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  const params = {
    TableName: 'MoviesTable'
  }

  try {
    const allMovies = await dynamoDB.scan(params).promise();
    return {
      body: JSON.stringify(allMovies),
      statusCode: 200,
      headers
    }
  }
  catch (error) {
    return {
      body: error.message,
      statusCode: 500,
      headers
    }
  }
};
