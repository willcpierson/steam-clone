const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [
    check('')
      .exists({ checkFalsy: true })
      .isLength({ min: 5, max: 500 })
      .withMessage('Your review must be longer than 5 characters, and shorter than 500'),
    handleValidationErrors
  ];
  
  module.exports = validateReviewInput;