const Podcast = require("../Model/Podcast")

// Upload Podcast
const createPodcast = async (req,res)=>{

try{

const {title,description,category,fileUrl} = req.body

const newPodcast = new Podcast({
title,
description,
category,
fileUrl
})

await newPodcast.save()

res.send("Podcast uploaded successfully")

}

catch(error){

res.send("Podcast upload failed")

}

}


// Get All Podcasts
const getPodcasts = async (req,res)=>{

try{

const podcasts = await Podcast.find()

res.json(podcasts)

}

catch(error){

res.send("Error fetching podcasts")

}

}


// Update Podcast
const updatePodcast = async (req,res)=>{

try{

const id = req.params.id

await Podcast.findByIdAndUpdate(id,req.body,{new:true})

res.send("Podcast updated")

}

catch(error){

res.send("Update failed")

}

}


// Delete Podcast
const deletePodcast = async (req,res)=>{

try{

const id = req.params.id

await Podcast.findByIdAndDelete(id)

res.send("Podcast deleted")

}

catch(error){

res.send("Delete failed")

}

}

module.exports = {
createPodcast,
getPodcasts,
updatePodcast,
deletePodcast
}