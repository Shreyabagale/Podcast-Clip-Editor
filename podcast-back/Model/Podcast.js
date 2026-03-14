const mongoose = require("mongoose")

const podcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: String
    },

    fileUrl: {
        type: String
    },
    userId: {
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

const Podcast = mongoose.model("Podcast", podcastSchema)

module.exports = Podcast;