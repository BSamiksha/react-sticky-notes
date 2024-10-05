import React, { useEffect, useState, useContext } from 'react'
// import { fakeData as notes } from '../assets/dummyData';
// import { databases } from '../appwrite/config';
// import { db } from '../appwrite/databases';
import NotesCard from '../components/NotesCard';
import { NoteContext } from '../context/NoteContext';
import Controls from '../components/Controls';

const NotesPages = () => {
  // const [notes, setNotes] = useState([]);

  // useEffect(()=> {
  //   init();
  // }, []);

  // const init = async () => {
  //   const response = await db.notes.list();
  //   // const response = await databases.listDocuments(
  //   //   process.env.REACT_APP_DATABASE_ID,
  //   //   process.env.REACT_APP_COLLECTION_NOTES_ID
  //   // )

  //   setNotes(response.documents);
  // }
  const {notes} = useContext(NoteContext)
  return (
    <div>
      {notes.map(note => (
        <NotesCard key={note.$id} note={note} />
      ))}
      <Controls />
    </div>
  )
}

export default NotesPages
