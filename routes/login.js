const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../db/userSchema');
require('dotenv').config();

router.post('/login', (req, res) => {
  User.findOne({
    $or: [
      { email: req.body.emailOrUsername },
      { username: req.body.emailOrUsername },
    ],
  })
    .then((user) => {
      const SALT_IDX_ARRAY_REV = process.env.SALT_IDX_LIST.split(',').reverse();
      const PASS_ARRAY = user.password.split('');

      SALT_IDX_ARRAY_REV.forEach(async (item) => {
        await PASS_ARRAY.splice(item, 1);
      });

      const joinSaltPass = PASS_ARRAY.join('');
      console.log(joinSaltPass);

      bcrypt.compare(req.body.password, joinSaltPass)
        .then((passChecked) => {
          if (!passChecked) {
            return res.status(400).send({
              message: 'Password kamu tidak valid',
            });
          }

          return res.status(200).send({
            userId: user._id,
            username: user.username,
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: 'Password kamu tidak valid',
            err,
          });
        });
    })
    .catch((err) => {
      res.status(404).send({
        message: 'Email / username tidak terdaftar',
        err,
      });
    });
});

module.exports = router;
