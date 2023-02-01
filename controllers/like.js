//imporation modèle de la base de donnée :
const Sauce = require('../models/sauces');


exports.likeSauce = (req, res, next) => { 
   
  //contenu de la requête like dislike envoyé par le navigateur
  const sauceLikeObject = req.body;

  
  //sélection de la sauce (permet l'affichage des likes dislikes sur le front)
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {      

      //like = +1 (like +1)
        if((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 1 )) {
            Sauce.updateOne({_id: req.params.id}, {inc$: {likes: 1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
            .then(() => res.status(201).json({message: '+1 like'}))
            .catch(error => res.status(400).json({ error }))
        }
    })}
