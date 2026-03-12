const Clip = require("../Model/Clip")

// Create Clip
const createClip = async (req,res)=>{

    try{

        const {podcastId,startTime,endTime,caption,category} = req.body

        const newClip = new Clip({
            podcastId,
            startTime,
            endTime,
            caption,
            category
        })

        await newClip.save()

        res.send("Clip created successfully")

    }

    catch(error){

        res.send("Clip creation failed")

    }

}


// Get All Clips
const getClips = async (req,res)=>{

    try{

        const clips = await Clip.find().populate("podcastId")

        res.json(clips)

    }

    catch(error){

        res.send("Error fetching clips")

    }

}


// Update Caption
const updateClip = async (req,res)=>{

    try{

        const id = req.params.id

        await Clip.findByIdAndUpdate(id,req.body,{new:true})

        res.send("Clip updated")

    }

    catch(error){

        res.send("Update failed")

    }

}


// Delete Clip
const deleteClip = async (req,res)=>{

    try{

        const id = req.params.id

        await Clip.findByIdAndDelete(id)

        res.send("Clip deleted")

    }

    catch(error){

        res.send("Delete failed")

    }

}

module.exports = {
    createClip,
    getClips,
    updateClip,
    deleteClip
}