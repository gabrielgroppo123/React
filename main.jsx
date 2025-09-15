import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import './index.css'
import Home from './assets/pages/home/home.jsx'
import Erro from './assets/pages/erro/erro.jsx'
import Exercicios from './assets/pages/exercicios/exercicios.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/exercicios' element={<Exercicios/>}/>
        <Route path='*' element={<Erro/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
