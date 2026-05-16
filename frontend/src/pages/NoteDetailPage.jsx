import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { LoaderIcon ,ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
const NoteDetailPage = () => {
  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true)
  const [saving,setSaving] =useState(false)
  const navigate = useNavigate()
  const {id}=useParams()
  //console.log({id});
  useEffect(()=>{
const fetchNotes = async () =>{
  try{
    const res = await api.get(`/notes/${id}`)
    setNote(res.data)
  } catch (error) {
    console.log(error);
    
    toast.error("Failed to fetch the note")
  }finally{
    setLoading(false)
  }
}

fetchNotes();
  },[id])

  const handleDelete = async ()=>{
      if(!window.confirm("Are you sure You want to delete this note?")){
        return;
      }

      try {
        await api.delete(`/notes/${id}`)
        toast.success("Note deleted.")
        navigate("/")
      } catch (error) {
        console.log(error)

        toast.error("Failed to delete note")
      }
  }

 const handleSave = async () => {
  if (!note.title.trim() || !note.content.trim()) {
    toast.error("All fields are required")
    return
  }

  setSaving(true)

  try {
    await api.put(`/notes/${id}`, {
      title: note.title,
      content: note.content,
    })

    toast.success("Note updated")
    navigate("/")
  } catch (error) {
    console.log(error)

    toast.error("Failed to update note")
  } finally {
    setSaving(false)
  }
}
  console.log({note});
  
  if(loading) {
    return(
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon  className='animate-spin size-10'/>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
        <div className='flex items-center justify-between mb-6'>
          <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className='h-5 w-5'/>
          Back to Notes
          </Link>
          <button onClick={()=> handleDelete()} className='btn btn-error btn-outline'>
            <Trash2Icon className='h-5 w-5'/>
            Delete Note
          </button>
          </div>

          <div className="card bg-base-100">
            <div className='card-body'>
              <div className="form-control mb-4">
                <label className='label'><span className='label-text'>Title</span></label>
                <input type="text" 
                placeholder='Note title'
                className='input input-bordered'
                value={note.title}
                onChange={(e)=>setNote({...note,title:e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className='label'><span className='label-text'>Content</span></label>
                <textarea 
                placeholder='write your note here...'
                className='textarea textarea-bordered h-32'
                value={note.content}
                onChange={(e)=>setNote({...note,content:e.target.value})}
                />
              </div>

              <div className='card-actions justify-end'>
                <button className='btn btn-primary ' disabled={saving} onClick={()=>handleSave()}>
                  {saving? "saving...": "Save Changes"}
                </button>
              </div>


            </div>
          </div>


        </div>

      </div>
      
    </div>
  )
}

export default NoteDetailPage
