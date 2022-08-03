const express = require('express');

const router = express.Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

router.get('/signup', async(req, res) => {
	res.render('signup');
});

router.post('/signup', async (req, res) => {
	let user = await new User({
		//userId: the authenticated userId
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8)
		});
		try {
			user = await user.save();
			res.redirect('/');
		} catch (e) {
			console.log(e);
			res.render('login');
		}
});  // Create a new user

router.post('/login', async(req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then(user => {
		if (!user) {
			return res.redirect('/login');
		}
		bcrypt
			.compare(password, user.password)
			.then(doMatch => {
			if (doMatch) {
				return res.redirect('/notes');
			}
			res.redirect('/');
			console.log('Wrong username or pwd');
			})
			.catch(err => {
			console.log(err);
			res.redirect('/');
			});
		})
		.catch(err => console.log(err));
})

// router.post("/", async (req, res) => {
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ email: req.body.email });
// 		if (!user)
// 			return res.status(401).send({ message: "Invalid Email or Password" });

// 		const validPassword = await bcrypt.compare(
// 			req.body.password,
// 			user.password
// 		);
// 		if (!validPassword)
// 			return res.status(401).send({ message: "Invalid Email or Password" });

// 		const token = user.generateAuthToken();
// 		res.status(200).send({ data: token, message: "logged in successfully" });
// 		res.redirect('/notes');
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

// const validate = (data) => {
// 	const schema = Joi.object({
// 		email: Joi.string().email().required().label("Email"),
// 		password: Joi.string().required().label("Password"),
// 	});
// 	return schema.validate(data);
// };

module.exports = router;


//router.post('/login') check the input if it matches any record bel db

//router.post('/signup') //Add the user to db