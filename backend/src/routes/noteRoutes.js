import express from "express"
import { createNote, deletePost, getAllNotes, updatePost,getNoteById } from "../controllers/noteController.js";
const router = express.Router();

router.get("/" , getAllNotes)
router.get("/:id", getNoteById)

 router.post("/", createNote);

 router.put("/:id" ,updatePost)

 router.delete("/:id", deletePost) 


export default router;



