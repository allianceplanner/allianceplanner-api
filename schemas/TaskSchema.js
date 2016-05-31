var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = new Schema({
    weddingId     : Number,
    name          : String,
    description   : String,
    dueDate       : Date,
    done          : Boolean
}, { collection : 'Task' });

TaskSchema.methods.list = function () {
  return this.model('Task').find();
}

module.exports = TaskSchema;
