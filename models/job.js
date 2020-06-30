const Joi = require("joi");
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  jobType: {
    type: String,
    enum: [
      "Tiempo completo",
      "Indefinido",
      "Por contrato",
      "Temporal",
      "Beca / Prácticas",
      "Medio tiempo",
      "Comisión",
    ],
    required: true,
  },
  company: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  location: {
    country: {
      type: String,
      default: "México",
      minlength: 2,
      maxlength: 50,
    },
    state: {
      type: String,
      enum: [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Coahuila",
        "Colima",
        "Chiapas",
        "Chihuahua",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "México",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas",
      ],
      required: function () {
        if (this.location.city === "Ciudad de México") return false;
        return true;
      },
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
  },
  salary: {
    mini: {
      type: Number,
      min: 0,
      required: function () {
        return this.salary.maxi;
      },
    },
    maxi: {
      type: Number,
      min: 0,
    },
  },
});

const Job = mongoose.model("Job", jobSchema);

function validateJob(job) {
  const schema = {
    title: Joi.string().min(10).max(50).required(),
    description: Joi.string().required(),
    jobType: Joi.string().required(),
    company: Joi.string().min(5).max(255).required(),
    location: Joi.object().required(),
    salary: Joi.object().required(),
  };

  return Joi.validate(job, schema);
}

exports.jobSchema = jobSchema;
exports.Job = Job;
exports.validate = validateJob;
