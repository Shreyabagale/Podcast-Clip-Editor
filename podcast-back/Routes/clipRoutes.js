const express = require("express")

const router = express.Router()

const {
createClip,
getClips,
updateClip,
deleteClip
} = require("../Controller/clipController")


router.post("/create",createClip)

router.get("/all/:userId",getClips)

router.put("/update/:id",updateClip)

router.delete("/delete/:id",deleteClip)

router.post("/generate-viral", async (req,res)=>{

const { podcastId } = req.body

let reels = []

for(let i=0;i<5;i++){

let start = Math.floor(Math.random()*120)

reels.push({

podcastId: podcastId,
title: "Auto Generated Clip " + (i+1),
startTime: start,
endTime: start + 15,
caption: "Auto generated",
category: "viral",
fileUrl: req.body.fileUrl

})

}

res.json(reels)

})



module.exports = router

