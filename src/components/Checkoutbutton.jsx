import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

const Checkoutbutton = ({books, user, setUser}) => {
    const params = useParams()
        const id = params.id*1

        const navigate = useNavigate()

        const singlebook = books.find((book) => {
            return book.id === id
        })

        const handleclick = async (event) => {
            event.preventDefault()

            const loggedInToken = window.localStorage.getItem('token')

            if(loggedInToken) {
                const response = await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${singlebook.id}`, {available:false}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInToken}`

                    }
                })

                console.log(user)
                setUser({books: [...user.books], singlebook})
                navigate(`/account`)
                console.log(response)
            }
            else {
                throw 'no token'
            }
        }



        return (
            <div>
                <button disabled = {(singlebook.available && id) ? false : true } onClick={handleclick}>Checkout</button>
                
            </div>
        )
    

}

export default Checkoutbutton