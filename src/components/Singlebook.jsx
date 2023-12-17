import {Link,useParams, useNavigate} from 'react-router-dom'
import axios from "axios"




const Singlebook = ({books, user, setUser}) => {
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


    
    
    if(!singlebook) {
        return null
    }
    else {
        return (
        <div className="containertwo">
            <Link to='/books'>
                Back to all books
            </Link>


            
            <div className="center">
           <div className="availabilitytwo">
           {singlebook.available === true ? "available" : "unavailable"}
           </div>

           
            
           <div>
                <button disabled = {(singlebook.available && id) ? false : true } onClick={handleclick}>Checkout Book</button>
                
            </div>

            </div>
           
            <h1>{singlebook.title}</h1>

            


            <h2 className="author">{singlebook.author}</h2>
            <p>{singlebook.description}</p>

            
            <img src={singlebook.coverimage} />
            
        </div>
        )
    }
}

export default Singlebook