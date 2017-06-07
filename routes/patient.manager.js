/**
 * Created by thisum_kankanamge on 1/6/17.
 */

var express = require('express');
var Constants = require('./constants');
var constants = require('../util/constants.json');
var patientRecord = require('../models/patient_record');
var tokenGenerator = require('jsonwebtoken');
var router = express.Router();


router.use('/', function (req, res, next) {

    tokenGenerator.verify(req.header('auth-token'), Constants.AUTH_PRIVATE_KEY, function (err, decoded) {
        if (err) {
            return res.status(401).json({status: Constants.RESPONSE_CODE_FAIL, message: "Authentication failed"});
        }
        else if (!decoded.user) {
            return res.status(401).json({status: Constants.RESPONSE_CODE_FAIL, message: "No user found"});
        }

        req.body.user = decoded.user;
        next();
    });
});

router.get('/search', function (req, res, next) {

    try{
        var criteria = createSearchCriteria(req.query);
        patientRecord.find()
            .exec(function (err, docs) {
                if (err) {
                    return res.status(500).json({status: Constants.RESPONSE_CODE_FAIL, message: err});
                }
                else if (!docs) {
                    return res.status(500).json({status: Constants.RESPONSE_CODE_FAIL, message: "No Requests Found"});
                }
                else {
                    return res.status(200).json({status: Constants.RESPONSE_CODE_SUCCESS, result: docs});
                }
            });
    }
    catch (e){
        console.error(e);
    }
});


function createSearchCriteria(param){
    var criteria = {};
    if( isNotNull(param.patient_name)){
        criteria.patient_name = param.patient_name;
    }
    if( isNotNull(param.from_date) && isNotNull(param.to_date)){
        var fromDate = parseInt(param.from_date);
        var toDate = parseInt(param.to_date);
        if( fromDate > 0 && toDate > 0 && toDate > fromDate ){
            criteria.requestTime  = {$gte: fromDate, $lte: toDate};
        }
    }

    return criteria;
}

function isNotNull(str) {
    return (str && str!=="undefined" && str.length > 0);
}

module.exports = router;
