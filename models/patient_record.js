/**
 * Created by thisum on 09/01/2017.
 */

var mongoose = require('mongoose');

var patientRecordSchema = mongoose.Schema({

    recordId        : {type:mongoose.Schema.Types.ObjectId, ref: 'patient'},
    leftLeg         : String,
    rightLeg        : String,
    recordTime      : Date,
    patientName     : String
});

module.exports = mongoose.model('patient', patientRecordSchema);