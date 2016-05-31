// Summary: Requirements
// Description:
var express         = require('express');
var mongoose        = require('mongoose');
var database        = require('../../configuration/database');
var WeddingSchema   = require('../../schemas/WeddingSchema');

// Summary:
// Description:
var router    = express.Router();
var Wedding   = mongoose.model('Wedding', WeddingSchema);

-mongoose.connect(database.host);

// Summary: actions
// Action: List
// Description:  GET Wedding listing
router.get('/', function(req, res, next) {

  Wedding.find(function(err, weddings) {
    if (err) res.send(err);
    res.json(weddings);
  });

});

// Action: Insert
// Description:  GET Wedding listing
router.post('/', function(req, res, next) {

  var wedding = new Wedding();

  for (var key in req.body) {
    if (wedding[key])
      wedding[key] = req.body[key];
  }

  wedding.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send(wedding);
    }
  });

});

router.get('/:id', function(req, res, next) {

  Wedding.findById(req.params.id, function(err, wedding) {
      if (err) res.send(err);
      res.json(wedding);
  });

});

router.put('/:id', function(req, res, next) {

  Wedding.findById(req.params.id, function(err, wedding) {

      if (err) res.send(err);

      for (var key in req.body) {
        if (wedding[key])
          wedding[key] = req.body[key];
      }

      wedding.save(function(err) {
        if (err) res.send(err);
        res.json(wedding);
      });

  });

});

router.delete('/:id', function(req, res, next) {

  Wedding.remove({
      _id: req.params.id
  }, function(err, bear) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
  });

});


module.exports = router;
