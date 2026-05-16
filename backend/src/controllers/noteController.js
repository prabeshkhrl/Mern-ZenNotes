import Note from "../models/Note.js"

export async function createNote(req,res){
    try {
   
        
        const {title,content} = req.body;
        const newNote = new Note({title:title,content:content})
        const savedNote=await newNote.save();
        res.status(201).json(savedNote)
        
    } catch (error) {
        console.log("Error Creating the post.");
        res.status(500).json({message:error.message})
    }
}

export async function getAllNotes(req,res){
try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
} catch (error) {
    console.error("Error Finding the notes." ,error);
    res.status(500).json({message:error.message})
    
}
}

export async function updatePost(req,res){
try {
    console.log(req.body);
    
    const {title,content}= req.body;
    const updatedNotes =await Note.findByIdAndUpdate(
        req.params.id,{title,content},
        {
            new:true,
        }
    );
    // if(updatedNotes==null) return res.status(404).json({message: "Note not found!"})
        res.status(200).json(updatedNotes)
  
} catch (error) {
    console.log("error in updating notes.",error);
    res.status(500).json({message:error.message})
}
}

export async function deletePost(req,res){
    try {
        const savedNote = await Note.findByIdAndDelete(req.params.id)
        if(!savedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message :"Note Deleted."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export async function getNoteById(req,res) {
    try {
        const savedNote = await Note.findById(req.params.id)
        if(!savedNote) return res.status(404).json({message:"Note not found"})
            res.status(200).json(savedNote);


    } catch (error) {
     res.status(500).json({message: error.message})

    }
}