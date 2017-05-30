/**
 * Created by thisum on 1/17/2017.
 */

var patientRecord = require('../models/patient_record');
var constants = require('../util/constants.json');
var express = require('express');
var Constants = require('./constants');
var router = express.Router();


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