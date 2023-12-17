import { useState, useEffect } from 'react'
import axios from 'axios'
import bookLogo from './assets/books.png'
import {Routes, Route, Link} from 'react-router-dom'
import Navigations from "./components/Navigations"
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import SuccessRegi from './components/SuccessRegi'
import Homepage from './components/Homepage'

import Singlebook from './components/Singlebook'
import Searchbar from './components/Searchbar'
import About from './components/About'


function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})

  const [books, setBooks] = useState([])

  useEffect (() => {
    const fetchBooks = async () => {
      const response = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
      setBooks (response.data.books)
    }
    fetchBooks()
  }, [])
  console.log(books)


  useEffect(() => {
    const attemptLogin = async() => {
      const loggedInToken = window.localStorage.getItem('token')
      

      if(loggedInToken){
        const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loggedInToken}`
          }
        })

        setUser(response.data)
      }else{
        
        throw 'no token'
      }

    }
    
    attemptLogin()
  },[token])





 
  return (
    <>
    <div className="top">
      <div className="logo">
      <h1><img id='logo-image' src={bookLogo}/><Link to='/'>Library App</Link></h1>
      </div>
    </div>

    <Navigations user={user}/>
    <Routes>
      <Route path='/' element={<Homepage user={user} />}/>
      <Route path='/about' element={<About user={user} />}/>
      <Route path='/successReg' element={<SuccessRegi />}/>
      <Route path='/books' element={<Books books={books} />}/>

      <Route path='/books/:id' element={<Singlebook books={books} user={user} setUser={setUser} /> } />

      <Route path='/login' element={<Login setUser={setUser} setToken={setToken}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/account' element={<Account user={user} setUser={setUser} setToken={setToken}/>}/>
    </Routes>

      
    </>
  )
}

export default App
