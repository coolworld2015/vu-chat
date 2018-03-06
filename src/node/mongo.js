var mongoose = require('mongoose');

//mongoose.connect('mongodb://admin:admin@ds053728.mongolab.com:53728/warehouse');
mongoose.connect('mongodb://localhost:27017/forpost');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Error from mongoDB: ' + err.message);
});

db.once('open', function callback() {
    console.log('Connected to mongoDB');
});

var Schema = mongoose.Schema;

//---------------------------------------------------------------------------------------------
var Users = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    pass: {type: String, required: true},
    description: {type: String, required: true}
});

var UsersModel = mongoose.model('Users', Users);
module.exports.UsersModel = UsersModel;

//---------------------------------------------------------------------------------------------
var Audit = new Schema({
    id: {type: String, required: true},
    user: {type: String, required: true},
    date: {type: String, required: true},
    user_id: {type: String, required: true},
    user_role: {type: String, required: true},
    rro_id: {type: String, required: true},
    description: {type: String, required: true}
});

var AuditModel = mongoose.model('Audit', Audit);
module.exports.AuditModel = AuditModel;

 