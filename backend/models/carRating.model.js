const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carRatingSchema = new Schema({
    username: { type: String, required: true },
    car: { type: String, require: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const carRating = mongoose.model('carRating', carRatingSchema);

module.exports = carRating;