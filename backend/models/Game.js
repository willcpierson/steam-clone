const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = Schema({
    developerName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number, // Not Integer, to account for decimals since most games end in XX.99
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});


module.exports = mongoose.model('Game', gameSchema);