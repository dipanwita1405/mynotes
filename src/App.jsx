import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './Notes'; 
import CreateNotes from './CreateNotes';
import UpdateNotes from './updateNotes'; 
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
    <Nav/>
      <Routes> 
        <Route path='/' element={<Notes />}></Route> 
        <Route path='/create' element={<CreateNotes />}></Route> 
        <Route path='/update/:id' element={<UpdateNotes />}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
