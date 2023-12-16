
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'


const Account = ({user, setUser, setToken }) => {
    const navigate = useNavigate()
    const [reservations, setReservations] = useState([])
    

    useEffect (() => {
        const fetchuserbooks = async() => {
            const loggedInToken = window.localStorage.getItem('token')

            if(loggedInToken) {
                const response = await axios.get ('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInToken}`
                    }
                })
                setReservations(response.data.reservation)
            }
            else {
                throw 'no token'
            }

        }
        fetchuserbooks()
    }, [])


    console.log(reservations)


    const deletereservation = async(reservationId) => {
        const loggedInToken = window.localStorage.getItem('token')

        if(loggedInToken) {
            const response = await axios.delete (`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInToken}`
        }
    })

    console.log(response)
    setReservations(reservations.filter((checkedout) => 
    {return checkedout.id !== reservationId}))
}
else {
    throw 'no token'
}
    }
    
    const logout = () => {
        window.localStorage.removeItem('token');
        setToken(null)
        setUser({})
        navigate('/')
    }
    if(!user.books){
        return null
    }
    else {
    return(
        <div className="container">
            <h1>Account</h1>
            <button onClick={() => {logout()}}>Logout</button>
            <hr/>
            <h2>Email: {user.email}</h2>
            <h4>Checked Out Books:</h4>

            <ul>
                {
                    reservations.map((reservation) => {
                        return (
                            <li key={reservation.id}>
                                {reservation.title}
                                <div><button onClick={() => {deletereservation(reservation.id)}}>Return</button></div>
                            </li>
                        )
                    })
                }
            </ul>
            
            
           
        </div>
    )
    }
}

export default Account