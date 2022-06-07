const CognitoExpress = require('cognito-express');

const connitoExpress = new CognitoExpress({
    region: process.env.AWS_DEFAULT_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    tokenExpiration: 3600
});

exports.validateAuth = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        connitoExpress.validate(token, (err) => {
            if(err) {
                res.status(401).send();
            } else {
                next();
            }
        })
    }
    else {
        res.status(401).send();
    }
}