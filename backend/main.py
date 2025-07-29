from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
# Allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Note model
class Note(BaseModel):
    id: str
    title: str
    content: str

# Simulated database
notes_db: List[Note] = []

@app.get("/notes", response_model=List[Note])
def get_notes():
    return notes_db

@app.post("/notes", response_model=Note)
def add_note(note: Note):
    notes_db.append(note)
    return note

@app.put("/notes/{note_id}", response_model=Note)
def update_note(note_id: str, updated_note: Note):
    for index, note in enumerate(notes_db):
        if note.id == note_id:
            notes_db[index] = updated_note
            return updated_note
    raise HTTPException(status_code=404, detail="Note not found")

@app.delete("/notes/{note_id}")
def delete_note(note_id: str):
    for note in notes_db:
        if note.id == note_id:
            notes_db.remove(note)
            return {"message": "Note deleted"}
    raise HTTPException(status_code=404, detail="Note not found")

@app.put("/notes/{note_id}/append")
def append_note_content(note_id: str, extra: dict):
    for note in notes:
        if note["id"] == note_id:
            note["content"] += "\n" + extra["newContent"]
            return {"message": "Content appended successfully"}
    raise HTTPException(status_code=404, detail="Note not found")
