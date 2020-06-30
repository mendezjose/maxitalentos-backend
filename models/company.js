const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
});

function validateCompany(company) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
  };

  return Joi.validate(company, schema);
}

const Company = mongoose.model("Company", companySchema);

exports.Company = Company;
exports.validate = validateCompany;
