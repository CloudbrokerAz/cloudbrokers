const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { validationResult } = require('express-validator');
const { raw } = require('body-parser');
const validators = require('./friendsValidator');
const { validateAuth } = require('./auth');

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




module.exports = router;