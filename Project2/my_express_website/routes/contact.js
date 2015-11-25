var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'anyPerson@gmail.com',
			pass: 'somePass'
		}
	});

	var mailOptions = {
		from: 'John Doe <johndoe@outlook.com>',
		to: 'anyPerson@gmail.com',
		subject: 'Website submission',
		text: 'You have a new submission with the following details...Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message, 
		html: '<p>You have a new submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(err, info){
		if(err){
			console.log('sendMail err', err);
			res.redirect('/');
		} else {
			console.log('Message sent', info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
