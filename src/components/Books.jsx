import {Link} from 'react-router-dom'
import Searchbar from './Searchbar'

const Books = ({books}) => {

    return(
        <div className='container'>

            <h1>Books</h1>
            
            <h3>Search:</h3>
            <Searchbar books={books} />

            <ul>
                {
                    books.map((book) => {
                        return (
                            <li key={book.id}>
                                <Link to={`/books/${book.id}`}>
                                {book.title}
                                </Link>
                                <div className="availability">{book.available === true ? "available" : "unavailable"}</div>
                                </li>

                                
                        )
                    })
                }
            </ul>
        
        </div>
    )
}

export default Books