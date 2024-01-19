const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Boolean, // true means positive review, false means negative review. "Would you recommend this game?"
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
