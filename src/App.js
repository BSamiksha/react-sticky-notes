import NoteProvider from "./context/NoteContext";
import NotesPages from "./pages/NotesPages"

const App = () => {
  return (
   <div className="app">
    <NoteProvider >
      <NotesPages />
    </NoteProvider>
   </div>
  )
}

export default App