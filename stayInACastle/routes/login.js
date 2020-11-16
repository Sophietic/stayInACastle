// const { Router } = require("express");
// const routerLogin = new Router;
// const bcryptjs = require("bcrypt");

// const User = require("../models/User.model");

// router.get("/login", (req, res, next) => 
// res.render("login"));

// router.post("/login", (req, res, next) => {
//     const { email, passwordHash } = req.body

//     if (email === '' || password === '') {
//         res.render('/login', {
//             errorMessage: 'Please enter both, email and password to login'
//         })
//         return;
//     } 

//     User.findOne({ email })
//         .then ( user => {
//             if (!user) {
//                 res.render('/login', { errorMessage: 'Email is not registered. Try another email.'});
//                 return;
//             } else if (bcryptjs.compareSync(passwordHash, user.passwordHash)) {
//                 req.session.currentUser = user;
//                 console.log(user)
//                 res.redirect('');
//             } else {
//                 res.render('/login', { errorMessage: 'Incorrect password.'});
//             }
//         })
//         .catch(error => next(error));
// })

// module.exports = routerLogin;