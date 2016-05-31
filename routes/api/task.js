// Summary: Requirements
// Description:
var express         = require('express');
var mongoose        = require('mongoose');
var database        = require('../../configuration/database');
var TaskSchema   = require('../../schemas/TaskSchema');

// Summary:
// Description:
var router    = express.Router();
var Task   = mongoose.model('Task', TaskSchema);

mongoose.connect(database.host);

// Summary: actions
// Action: List
// Description:  GET Task listing
router.get('/', function(req, res, next) {

  Task.find(function(err, Tasks) {
    if (err) res.send(err);
    res.json(Tasks);
  });

});

// Action: Insert
// Description:  GET Task listing
router.post('/', function(req, res, next) {

  var Task = new Task();

  for (var key in req.body) {
    if (Task[key])
      Task[key] = req.body[key];
  }

  Task.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send(Task);
    }
  });

});

router.get('/:id', function(req, res, next) {

  Task.findById(req.params.id, function(err, Task) {
      if (err) res.send(err);
      res.json(Task);
  });

});

router.put('/:id', function(req, res, next) {

  Task.findById(req.params.id, function(err, Task) {

      if (err) res.send(err);

      for (var key in req.body) {
        if (Task[key])
          Task[key] = req.body[key];
      }

      Task.save(function(err) {
        if (err) res.send(err);
        res.json(Task);
      });

  });

});

router.delete('/:id', function(req, res, next) {

  Task.remove({
      _id: req.params.id
  }, function(err, bear) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
  });

});

// Summary: actions
// Action: Get By Wedding
// Description:  GET Task listing given a wedding
router.get('/given-wedding/:id', function(req, res, next) {

  Task.find({
    weddingId : req.params.id
  },function(err, Tasks) {
      if (err) res.send(err);
    res.json(Tasks);
  });

});

module.exports = router;
