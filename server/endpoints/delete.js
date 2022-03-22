'use strict';

const { DynamoDB } = require('aws-sdk');
const dynamoDB = new DynamoDB.DocumentClient();

module.exports.delete = async (event) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  const { id } = JSON.parse(event.body) 
  
  const params = {
    TableName: 'MoviesTable',
    Key: {
      id
    }
  }

  try {
    const addedMovie = await dynamoDB.delete(params).promise();
    return {
      body: JSON.stringify(addedMovie),
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
