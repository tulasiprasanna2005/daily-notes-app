import React from 'react'

const NoteItem = ({ note, onDelete, onUpdateClick }) => {
  return (
    <div className="note-card">
      <h3>Note</h3>
      <ul>
        {note.content.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
      <div className="note-actions">
        <button onClick={() => onUpdateClick(note.id)}>Add More</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  )
}

export default NoteItem
