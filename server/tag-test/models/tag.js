var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagSchema = new Schema(
    {
        tags:[{
            type:String
        }]
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('tag',tagSchema);