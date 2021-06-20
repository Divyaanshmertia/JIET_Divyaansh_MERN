const mongoose = require("mongoose");
const Blog = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: false
    }
});

module.exports = mongoose.model("Blog", Blog, "Blog");