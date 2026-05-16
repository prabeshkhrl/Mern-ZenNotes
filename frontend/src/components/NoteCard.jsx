import React from "react";
import { PenSquareIcon, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
const NoteCard = ({ note ,setNotes }) => {
  const handleDelete = async (e,id)=>{
    e.preventDefault();
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev)=>prev.filter(note =>note._id !==id))
      toast.success("Note Deleted.")
    } catch (error) {
      console.log("error to delete note",error);
      
      toast.error("Failed to delete note.")
    }
  }
  return (
    <div>
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9D]"
      >
        <div className="card-body p-4">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-3">
            <span className="text-sm text-base-content/60">
              {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button className="btn btn-ghost btn-xs text-error" onClick={(e,)=> handleDelete(e,note._id)}>
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
