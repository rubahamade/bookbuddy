import {Link} from 'react-router-dom'
import Searchbar from './Searchbar'

const Books = ({books}) => {

    return(
        <div className='container'>

            <h1>Books List</h1>
            

            <div className="searchbar">
            <p>Search Books</p>
            <Searchbar books={books} />

            </div>

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