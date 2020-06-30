const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send("Correo o contraseña inválidos");

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Correo o contraseña inválidos");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Correo o contraseña inválidos");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
      .label("Correo electrónico"),
    password: Joi.string().min(5).max(255).required().label("Contraseña"),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
