const mongoose = require("mongoose")

const clipSchema = new mongoose.Schema({
    podcastId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Podcast"
    },
    title: {
        type: String
    },

    startTime: {
        type: Number
    },

    endTime: {
        type: Number
    },

    caption: {
        type: String
    },

    category: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

const Clip = mongoose.model("Clip", clipSchema)

module.exports = Clip