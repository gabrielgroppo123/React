import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Exercicios from './assets/pages/exercicios'
import Ex1  from './assets/pages/Ex1'
import Ex2 from './assets/pages/Ex2'
import Ex3 from './assets/pages/Ex3'
import Ex4 from './assets/pages/Ex4'
import Ex5 from './assets/pages/Ex5'
import Ex6 from './assets/pages/Ex6'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Exercicios></Exercicios>}></Route>
        <Route path='/ex1' element={<Ex1></Ex1>}></Route>
        <Route path='/ex2' element={<Ex2></Ex2>}></Route>
        <Route path='/ex3' element={<Ex3></Ex3>}></Route>
        <Route path='/ex4' element={<Ex4></Ex4>}></Route>
        <Route path='/ex5' element={<Ex5></Ex5>}></Route>
        <Route path='/ex6' element={<Ex6></Ex6>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
