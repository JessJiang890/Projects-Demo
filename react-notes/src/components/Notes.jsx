import React, { useState, useEffect } from 'react';
import Note from './Note';
import CreateNote from './CreateNote';
import '../style/Note.css';
import { v4 as uuid } from 'uuid';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  // get text and store in inputText
  const handleText = (e) => {
    setInputText(e.target.value);
  };

  // add new note
  const addNote = () => {
    //if you need to update state based on the previous state value
    //when using setState, pass a callback function, use previous state as the parameter and return new state
    setNotes((prevState) => [...prevState, { id: uuid(), text: inputText }]);
    //clear textarea
    setInputText('');
  };

  //delete
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Notes'));
    if (Array.isArray(data) && data.length > 0) {
      setNotes(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('Notes', JSON.stringify(notes));
    }
  }, [notes, loading]);
  return (
    <div className="notes">
      {notes.length > 0 &&
        notes.map((note) => (
          <Note
            id={note.id}
            key={note.id}
            text={note.text}
            deleteNote={deleteNote}
          />
        ))}
      <CreateNote
        handleText={handleText}
        addNote={addNote}
        inputText={inputText}
      />
    </div>
  );
};

export default Notes;
