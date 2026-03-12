const express = require("express")

const router = express.Router()

const {
createClip,
getClips,
updateClip,
deleteClip
} = require("../Controller/clipController")


router.post("/create",createClip)

router.get("/all",getClips)

router.put("/update/:id",updateClip)

router.delete("/delete/:id",deleteClip)

module.exports = router