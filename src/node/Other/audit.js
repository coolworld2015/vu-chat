var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var AuditModel = require('./mongo').AuditModel;

var Audit = {
    getAudit: getAudit,
    addAudit: addAudit,
    _removeAllAudit: removeAllAudit
};

module.exports.Audit = Audit;

function getAudit(req, res) {
    return AuditModel.find(function (err, audits) {
        if (!err) {
            return res.send(audits);
        } else {
            res.statusCode = 500;
            return res.send({error: 'Server error'});
        }
    }).sort({date: -1});  //TODO sort reverse
}

function addAudit(req, res) {
    var date = new Date().toJSON().slice(0, 10);
    var time = new Date().toTimeString().slice(0, 8);
    AuditModel.create({
		id: req.body.id,
		user: req.body.user,
		date: date + ' ' + time,
		user_id: req.body.user_id,
		user_role: req.body.user_role,
		rro_id: req.body.rro_id,
		description: req.body.description
	},
	function (err, audits) {
		if (err) {
			console.log(err)
			return res.send({error: 'Server error'});
		} else {
			res.send(audits);
		}
	});
}

function removeAllAudit(req, res, err) {
    AuditModel.remove({}, function (err) {
    });
    res.send('Collection Audit removed');
}