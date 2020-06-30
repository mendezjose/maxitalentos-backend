const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Job, validate } = require("../models/job");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const jobs = await Job.find().select("-__v").sort("title");
  res.send(jobs);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let job = new Job({
    title: req.body.title,
    description: req.body.description,
    jobType: req.body.jobType,
    company: req.body.company,
    location: {
      country: req.body.location.country,
      state: req.body.location.state,
      city: req.body.location.city,
    },
    salary: {
      mini: req.body.salary.mini,
      maxi: req.body.salary.maxi,
    },
  });
  job = await job.save();

  res.send(job);
});

// router.put("/:id", [auth, validateObjectId], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     {
//       new: true
//     }
//   );

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

// router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id).select("-__v");

  if (!job)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(job);
});

module.exports = router;
