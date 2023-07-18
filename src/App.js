import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddLetterPage from './scenes/AddLetterPage.jsx'
import AllLettersPage from './scenes/AllLettersPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddLetterPage />}></Route>
      <Route path="/all-letters" element={<AllLettersPage />}></Route>
    </Routes>
  )
}

export default App
