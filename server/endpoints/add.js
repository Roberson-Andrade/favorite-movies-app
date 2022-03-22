'use strict';

const { DynamoDB } = require('aws-sdk');
const response = require('../utils/response');
const dynamoDB = new DynamoDB.DocumentClient();

module.exports.add = async (event) => {
  const { id, rating, listName} = JSON.parse(event.body);
  const TableName = 'MoviesTable';

  const params = {
    TableName,
    Item: {
      id,
      rating,
      listName,
    },
  }

  try {
    const existingMovie = await dynamoDB.get({ TableName, Key: { id }}).promise();
    
    if(existingMovie.Item) {
      return response(`The movie ${id} is already in your list!`, 400)
    }

    await dynamoDB.put(params).promise();
    return response(`Movie ${id} added!`, 201)
  }
  catch (error) {
    return response(error.message, 500)
  }
};
