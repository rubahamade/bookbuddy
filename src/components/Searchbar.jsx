import {Link} from "react-router-dom"
import { useState } from "react"

const Searchbar = ({books}) => {
    const [searchtitle, setSearchtitle] = useState('')

    const filteredtitles = books.filter ((book) => {
        return book.title.toLowerCase().indexOf(searchtitle.toLowerCase()) !== -1
    })

    return (
        <div>
            <label>
                <input type="text" value={searchtitle} onChange={(event) => {setSearchtitle(event.target.value)}} />
            </label>

            {
                searchtitle.length > 0 ?
                <div>
                    <h3>Viewing {filteredtitles.length} books of {books.length}</h3>

                    <ul>
                        {filteredtitles.map((book) => {
                            return <li key={book.id}><Link to={`/books/${book.id}`}>{book.title}</Link></li>
                        })}
                    </ul>
                </div>

                : null
            }
        </div>
    )


}

export default Searchbar