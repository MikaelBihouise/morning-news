var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

var user = process.env.MONGO_USER;
var password = process.env.MONGO_PW;
var dbName = process.env.MONGO_URL;

mongoose.connect(`mongodb+srv://${user}:${password}@${dbName}`,
    options,
    function(err){
        console.log(err);
    }
)

module.exports = mongoose