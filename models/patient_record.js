/**
 * Created by thisum on 09/01/2017.
 */

var mongoose = require('mongoose');

var patientRecordSchema = mongoose.Schema({

    recordId        : {type:mongoose.Schema.Types.ObjectId, ref: 'patient'},
    recordTime      : Date,
    patientName     : String,
    patientNameLC   : String,
    patientEmail    : String,
    leftLeg         : String,
    rightLeg        : String
});

module.exports = mongoose.model('patient', patientRecordSchema);