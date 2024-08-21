
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './login/Login'
import Admin from './admin/Admin'
import User from './user/User'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/admin' element={<Admin />}></Route>
      <Route path='/user' element={<User />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
