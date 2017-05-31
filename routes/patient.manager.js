/**
 * Created by thisum_kankanamge on 1/6/17.
 */

var express = require('express');
var tokenGenerator = require('jsonwebtoken');
var request = require('request');
var frRequest = require('../models/patient_record');
var Constants = require('./constants');
var patientRecord = require('../models/patient_record');
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

router.get('/load', function (req, res, next) {

    patientRecord.find({}, function (err, docs) {
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
});


router.post('/', function (req, res, next) {

    var leftLeg = req.query.left_leg;
    var rightLeg = req.query.right_leg;
    var logTime = req.query.log_time;
    var patient = req.query.patient;


    if (leftLeg && rightLeg) {
        try {
            saveRequest( leftLeg, rightLeg, logTime, patient, function(){
                res.json(constants.success.msg_save_success);
            } )
        }
        catch (e) {
            console.error(e);
            res.json(constants.error.msg_save_error);
        }
    }
});

router.get('/', function (req, res, next) {

    var leftLeg = req.query.left_leg;
    var rightLeg = req.query.right_leg;
    var logTime = req.query.log_time;
    var patient = req.query.patient;


    if (leftLeg && rightLeg) {
        try {
            saveRequest( leftLeg, rightLeg, logTime, patient, function(){
                res.json(constants.success.msg_save_success);
            } )
        }
        catch (e) {
            console.error(e);
            res.json(constants.error.msg_save_error);
        }
    }
});

function saveRequest(leftLeg, rightLeg, logTime, patient, callback) {

    var newRecord = new patientRecord({

        leftLeg: leftLeg,
        rightLeg: rightLeg,
        recordTime: Date.now(),
        patientName: patient
    });

    newRecord.save(function (err, res) {
        if (err) {
            console.error(err);
            callback(constants.error.msg_save_error);
        } else {
            callback(constants.success.msg_save_success);
        }
    });
}


module.exports = router;

module.exports = router;