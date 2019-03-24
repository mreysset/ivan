var mongoose = require('mongoose');
var schema = mongoose.Schema;

var VideoSchema = new Schema(
    {
        file: {type: String, unique: true, required: true},
        title: {type: String, required: true, maxlenght: 200},
        producer: {type: String, required: true, maxlenght: 25},
        director: {type: String, required: true, maxlenght: 25},
        cast: {type: [String], required: true},
        logline: {type: String, required: true, maxlenght: 1000},
        tags: {type: [String]}
    }
);

//Virtual for video's URL
VideoSchema.virtual('url').get(function(){
    return '/video/' + this._id;
});

//Export model
module.exports = mongoose.model('Video', VideoSchema);