const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  ingredients: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    default: null
  },
  uncountable: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);
