// Require mongoose 
var mongoose=require('mongoose');

// Define a schema
var BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: "Manish"
    }
});

module.exports = mongoose.model(
    'Blog', BlogSchema);
