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
    type: Object,
    required: true,
    trim: true
  },
  quantity: {
    type: Object,
    required: true,
    default: null
  },
  uncountable: {
    type: Object,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = mongoose.model('Task', TaskSchema);
