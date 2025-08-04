import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const handleAddNote = () => {
    if (title.trim() === "" || text.trim() === "") return

    const newNote = {
      id: uuidv4(),
      title,
      updates: [text],
    }
    setNotes([newNote, ...notes])
    setTitle("")
    setText("")
  }

  const handleAddUpdate = (noteId, updateText) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, updates: [...note.updates, updateText] }
          : note
      )
    )
  }

  const handleDeleteNote = id => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  return (
    <div className="app-container">
      <h1>📝 Daily Notes App</h1>

      <div className="input-section">
        <input
          placeholder="Note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div className="notes-list">
        {notes.map(note => (
          <div className="note-card" key={note.id}>
            <h3>{note.title}</h3>
            <ul>
              {note.updates.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>

            <NoteUpdateInput onAddUpdate={text => handleAddUpdate(note.id, text)} />
            <button className="delete-btn" onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function NoteUpdateInput({ onAddUpdate }) {
  const [updateText, setUpdateText] = useState("")

  const handleUpdate = () => {
    if (updateText.trim() !== "") {
      onAddUpdate(updateText)
      setUpdateText("")
    }
  }

  return (
    <div className="update-section">
      <input
        placeholder="Add more to this note..."
        value={updateText}
        onChange={e => setUpdateText(e.target.value)}
      />
      <button onClick={handleUpdate}>➕</button>
    </div>
  )
}

export default App
