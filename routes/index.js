var express = require('express');
var router = express.Router();
var request = require('sync-request')
var userModel = require("../models/users");

router.post("/getArticlesBySource", async function(req,res, next){
 // console.log(req.body.lang, req.body.country)
var articleList = request(
  "GET",
  `https://newsapi.org/v2/sources?language=${req.body.lang}&country=${req.body.country}&apiKey=c27f8d9db341451e91f5c317cca53e34`
);
var articleListAPI = JSON.parse( articleList.body);
//console.log(articleListAPI);
var articleLoaded =articleListAPI.sources
res.json({articleLoaded} );

});


router.post("/addToWishList", async function (req, res, next) {
  /* récupérer les 4 DATA de la wishlist du store*/
  var newArticleToWishList = {
    title : req.body.title, 
    content : req.body.content, 
    description : req.body.description, 
    image : req.body.urltoimage,

  }
 console.log(newArticleToWishList , "naW")
  /* pouser les data dans la  */

  //console.log(req.body.token, "pp");
  const userConnected = await userModel.findOne({
    token: req.body.token
  });
  //console.log(userConnected,"uC");
console.log(userConnected.wishlist);
  var arrayWishList = userConnected.wishlist;
  var UserWithNEwArticle = arrayWishList.push(newArticleToWishList)
  console.log(UserWithNEwArticle);

  /* envoyer les données de la wihlist dans la bdd */
  saveUserWithNEwArticle = await UserWithNEwArticle.save()
  

  /*enregister les articles de la bdd */

  var newWishList = UserWithNEwArticle.Wishlist
  
  /* définir si ici on veut que ce soit la route du login*/
  res.json({ newWishlist });
});


module.exports = router;
