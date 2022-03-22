'use strict';

const { DynamoDB } = require('aws-sdk');
const response = require('../utils/response');
const dynamoDB = new DynamoDB.DocumentClient();

module.exports.delete = async (event) => {
  const { id } = JSON.parse(event.body) 
  const TableName = 'MoviesTable';

  const params = {
    TableName,
    Key: {
      id
    }
  }

  try {
    const existingMovie = await dynamoDB.get({ TableName, Key: { id }}).promise();
    
    if(!existingMovie.Item) {
      return response(`The movie ${id} isn't in your list!`, 404)
    }

    await dynamoDB.delete(params).promise();
    return response(`The movie ${id} was removed!`, 200);
  }
  catch (error) {
    return response(error.message, 500)
  }
};
