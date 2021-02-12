const mongoose = require('mongoose')

const wishlistSchema = mongoose.Schema({
    title: String,
    content: String,
    description: String,
    urltoimage: String,
})

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token: String,
    wishlist: [wishlistSchema],
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel