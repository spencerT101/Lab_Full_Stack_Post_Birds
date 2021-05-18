const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  // Create
  router.post('/', (req, res) => {
    const newSighting = req.body;
    collection
      .insertOne(newSighting)
      .then((document) => res.json(document) )
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  
  })

  // DELETE
  router.delete('/:id', (req, res) => {
    const deleteSighting = req.params.id
      collection
      .deleteOne({_id: ObjectID(deleteSighting)});
      collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))

  })

  return router;
};

module.exports = createRouter;
