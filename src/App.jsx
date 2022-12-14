import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import Purchages from './pages/Purchages'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import {useSelector} from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'
import CreateUser from './pages/CreateUser'

function App() {

  const isLoading =useSelector(state=> state.isLoading)


  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className='my-5'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/product/:id' element={<ProductsDetail />}/>
          <Route path='/createUser' element={<CreateUser/>} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchages />}/>
          </Route>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Container>
    </HashRouter>
    
  )
}

export default App
