const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const docClient = new AWS.DynamoDB.DocumentClient();

exports.postFriendsValidators = [
  check('rating').isNumeric(),
  check('id').custom(async value => {
    const params = {
      TableName: 'nodejs-api'
    }
    let ids = await docClient.scan(params).promise();
    let existingIds = ids.Items.find(item => item.id === value);
    if (existingIds) {
      return Promise.reject('Id already exists');
    }
  })
]