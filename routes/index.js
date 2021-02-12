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

  if(req.body == undefined){

    const userConnected = await userModel.findOne({
      token: req.body.token,
    });

    var initialWLlog = userConnected.wishlist;

    res.json({initialWLlog})
  }else{
    /* récupérer les 4 DATA de la wishlist du store*/
    var newArticleToWishList = {
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
      image: req.body.urltoimage,
    };

    const userConnected = await userModel.findOne({
      token: req.body.token,
    });

    console.log(newArticleToWishList);

    var UserWithNEwArticle = userConnected.wishlist.push(newArticleToWishList);

    console.log(userConnected, "HELLO WORLD");

    await userConnected.save();

    userConnected.save() ? (save = true) : (save = false);

    res.json({ save });
  }
});

router.post("/deleteToWishList", async function (req, res, next) {
  /* récupérer la wishliste du user par le token*/

  const userConnected = await userModel.findOne({
    token: req.body.token,
  });

  /* récupérer la wishlist */
  var arrayWishList = userConnected.wishlist;

  /* filtrer la liste de article delete*/

  var newArrayWishList = arrayWishList.filter(
              (article) => article.title !== req.body.title)


  
    /*remettre à jour la wishlist dans DB*/ 
  userConnected.wishlist = newArrayWishList;


 await userConnected.save();

  res.json({  });
});

module.exports = router;





