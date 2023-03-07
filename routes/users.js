const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/login', (req, res) => res.render('login'));


router.get('/register', (req, res) => res.render('register'));

// Register handle 

router.post('/register', (req, res) => {
    const { name, email, password, password2 } =  req.body;
    let errors = [];

    //Check required fields

    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match 

    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length 

    if(password.length < 6) {
        errors.push({msg: 'Password is too short (at least 6 chars)'})
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name, email, password, password2
        })
    } else {
        // Validation Passed 
        User.findOne({email})
            .then(user => {
                if(user) {
                    // User Exists 
                    errors.push({ msg: 'Email is already registered' })
                    res.render('register', {
                        errors,
                        name, email, password, password2
                    })
                    console.log(errors);
                } else {
                    const newUser = new User({
                        name, 
                        email, 
                        password
                    });

                    // Hash Password    
                    bcrypt.getSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            // Set password to hashed 
                            newUser.password = hash;
                            // save User 
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err));
                        }))
                    
                }
            })
    }
})

module.exports = router;
 