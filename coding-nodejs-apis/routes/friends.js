const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { validationResult } = require('express-validator');
const { raw } = require('body-parser');
const validators = require('./friendsValidator');
const { validateAuth } = require('../auth');
const { Route53Resolver } = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const docClient = new AWS.DynamoDB.DocumentClient();

router.get('/:id?', async (req, res) => {

    const params = {
      TableName: 'nodejs-api'
    }

    let responseData;
    if (req.params.id) {
        params.Key = {
            id: req.params.id
        }
    }
    else {
      if(req.query.id){
        params.Key = {
            id: req.query.id
        }
      }
    }

    if (!params.Key) {
        responseData = await docClient.scan(params).promise();
    }
    else {
        responseData = await docClient.get(params).promise();
    }

    res.json(responseData)
})

router.post('/', [validateAuth, ...validators.postFriendsValidators] , async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ 
      errors: errors.array() 
    })
  }
  else{

    const params = {
      TableName: 'nodejs-api',
      Item: req.body
    }

    docClient.put(params, (error) => {
      if (!error) {
        res.status(201).send();
      } else {
        res.status(500).send("Unable to add record: " + error);
      }
    })
  }
})

router.delete('/:id?', async (req, res) => {

  const params = {
    TableName: 'nodejs-api'
  }

  let responseData;
  if (req.params.id) {
      params.Key = {
          id: req.params.id
      }
  }
  else {
    if(req.query.id){
      params.Key = {
          id: req.query.id
      }
    }
  }

  if (!params.Key) {
      res.send("ID is required");
  }
  else {
      responseData = await docClient.delete(params).promise();
      res.status(200).send("Record deleted");
  }
  
})

router.patch('/:id?', async (req, res) => {
  console.log(req.body.firstName)

  const params = {
    TableName: 'nodejs-api',
    ExpressionAttributeValues: {
      ':f': req.body.firstName
    },
    UpdateExpression: 'set firstName = :f'
  }

  let responseData;
  if (req.params.id) {
      params.Key = {
          id: req.params.id
      }
  }
  else {
    if(req.query.id){
      params.Key = {
          id: req.query.id
      }
    }
  }

  if (!params.Key) {
    res.send("ID is required");
  }
  else {
      responseData = await docClient.update(params, function(error, data) {
          if (error) {
              res.status(500).send("Unable to update record: " + error);
          } else {
              res.status(200).send("Record updated");
          }
      });
      console.log(responseData);
  }
})


module.exports = router;