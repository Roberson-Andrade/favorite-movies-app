'use strict';

const { DynamoDB } = require('aws-sdk');
const dynamoDB = new DynamoDB.DocumentClient();

module.exports.add = async (event) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  const { id, rating, listName} = JSON.parse(event.body) 
  
  const params = {
    TableName: 'MoviesTable',
    Item: {
      id,
      rating,
      listName,
    },
  }

  try {
    const addedMovie = await dynamoDB.put(params).promise();
    return {
      body: JSON.stringify(addedMovie),
      statusCode: 201,
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
