const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../db/userSchema');
require('dotenv').config();

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((passwordHashed) => {
      const SALT_ARRAY = process.env.SALT_LIST.split('');
      const SALT_IDX_ARRAY = process.env.SALT_IDX_LIST.split(',');
      const PASS_ARRAY = passwordHashed.split('');

      for (let i = 0; i < SALT_IDX_ARRAY.length; i++) {
        const x = Math.floor((Math.random() * 60) + 1);
        PASS_ARRAY.splice(SALT_IDX_ARRAY[i], 0, SALT_ARRAY[x]);
      }
      const joinSaltPass = PASS_ARRAY.join('');

      const user = new User({
        username: req.body.username,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        password: joinSaltPass,
      });

      user.save()
        .then((result) => {
          res.status(201).send({
            message: 'Registration successfully',
            result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: 'Registration failed',
            err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'password was not hashed',
        err,
      });
    });
});

module.exports = router;
