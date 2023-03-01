const router = require('express').Router();
let carRating = require('../models/carRating.model');

router.route('/').get((req, res) => {
    carRating.find()
        .then(carRatings => res.json(carRatings))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const car = req.body.car;
    const description = req.body.description;
    const rating = Number(req.body.rating);
    const date = Date.parse(req.body.date);

    const newcarRating = new carRating({
        username,
        car,
        description,
        rating,
        date,
    });

    newcarRating.save()
        .then(() => res.json('carRating added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    carRating.findById(req.params.id)
      .then(carRating => res.json(carRating))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    carRating.findByIdAndDelete(req.params.id)
      .then(() => res.json('carRating deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    carRating.findById(req.params.id)
      .then(carRating => {
        carRating.username = req.body.username;
        carRating.car = req.body.car;
        carRating.description = req.body.description;
        carRating.rating = Number(req.body.rating);
        carRating.date = Date.parse(req.body.date);
  
        carRating.save()
          .then(() => res.json('carRating updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;