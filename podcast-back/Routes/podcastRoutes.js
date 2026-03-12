const express = require("express")

const router = express.Router()

const {
createPodcast,
getPodcasts,
updatePodcast,
deletePodcast
} = require("../Controller/podcastController")

router.post("/add",createPodcast)

router.get("/all",getPodcasts)

router.put("/update/:id",updatePodcast)

router.delete("/delete/:id",deletePodcast)

module.exports = router