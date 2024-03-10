import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateTea from './pages/CreateTea';
import ShowTea from './pages/ShowTea';
import EditTea from './pages/EditTea';
import DeleteTea from './pages/DeleteTea';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/teas/create' element={<CreateTea />} />
      <Route path='/teas/details/:id' element={<ShowTea />} />
      <Route path='/teas/edit/:id' element={<EditTea />} />
      <Route path='/teas/delete/:id' element={<DeleteTea />} />
    </Routes>
  )
}

export default App
