const Sauce = require('../models/sauces')
const fs = require('fs')

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._userId,
    delete sauceObject._id;

    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // A revoir
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce crée'}))
        .catch(error => res.status(400).json({ error }));
}


exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
  }

exports.modifySauce = (req, res) => {
    const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // A revoir
    } : { ...req.body }

    delete sauceObject._userId
    Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({ message: 'Non-autorisé' })
        } else {
          Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message: 'Objet modifié'}))
            .catch(error => res.status(401).json({ error }))
        }
      })
      .catch((error) => {res.status(400).json({ error })})
  }
  
exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({message: 'Non-autorisé'})
        } else {
          const filename = sauce.imageUrl.split('/images/')[1]
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
              .then(() => {res.status(200).json({message: 'Objet supprimé'})})
              .catch(error => res.status(401).json({ error }))
          })
        }
      })
      .catch(error => {res.status(500).json({ error })})
  }
  
exports.getOneSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }))
  }
  