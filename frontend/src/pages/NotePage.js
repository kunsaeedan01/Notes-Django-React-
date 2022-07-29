import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'



const NotePage = () => {
  const navigate = useNavigate()
  const {id} = useParams();
  let [note, setNote] = useState(null);

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (const element of cookies) {
            const cookie = element.trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
  const csrftoken = getCookie('csrftoken');
  useEffect(() => {
    getNote()
  }, [id])

  let getNote = async () => {
    if(id==='new') return
    let response = await fetch(`/api/notes/${id}`)
    let data = await response.json()
    setNote(data)
  }
  
  const createNote = async () => {
    await fetch(`/api/notes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ ...note, 'updated': new Date() })
    })
}

  let updateNote = async () => {
    await fetch(`/api/notes/${id}/`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(note)
    })
  }

  let deleteNote = async () => {
    await fetch(`/api/notes/${id}/`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    })
    navigate('/')
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (id != "new" && !note.body) {
        deleteNote()
    } else if (id != "new") {
        updateNote()
    } else if (id === 'new' && note !== null) {
        createNote()
    }

    navigate('/')

    
}

  return (
    <div className='note'>
      <div className="note-header">
                <h3>
                    <Link to={'/'}>
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
      <textarea onChange={(e) => setNote({ ...note, 'body': e.target.value })} value={note?.body}>
        
        </textarea>
    </div>
  )
}

export default NotePage;