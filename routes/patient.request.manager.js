/**
 * Created by thisum on 6/6/2017.
 */
var express = require('express');
var tokenGenerator = require('jsonwebtoken');
var request = require('request');
var frRequest = require('../models/patient_record');
var Constants = require('./constants');
var constants = require('../util/constants.json');
var patientRecord = require('../models/patient_record');
var router = express.Router();

router.post('/', function (req, res, next) {

    var leftLeg = req.query.left_leg;
    var rightLeg = req.query.right_leg;
    var email = req.query.patient_email;
    var patient = req.query.patient_name;


    if (leftLeg && rightLeg) {
        try {
            saveRequest( leftLeg, rightLeg, email, patient, function(){
                res.json(constants.success.msg_save_success);
            } )
        }
        catch (e) {
            console.error(e);
            res.json(constants.error.msg_save_error);
        }
    }
    else{
        res.json(constants.error.msg_save_error);
    }
});

function saveRequest(leftLeg, rightLeg, email, patient, callback) {

    var newRecord = new patientRecord({
        leftLeg: leftLeg,
        rightLeg: rightLeg,
        recordTime: Date.now(),
        patientName: patient,
        patientNameLC: patient.toLowerCase(),
        patientEmail: email
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