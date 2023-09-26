import { useState, useEffect } from 'react';
import axios from 'axios';

interface Shelf {
  shelf: string
}

const BookshelfLabel = () => {

  const [bookLabel, setBookLabel] = useState("");

  useEffect(() => {
    axios.put('/api/bookshelf/bookId/shelfKey')
        .then((response) => {
            setBookLabel(response.data);
            console.log(response.data);
        })
}, [bookLabel])

  return (
    <div>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => setBookLabel(event.target.value)}
    >
      <option value=""></option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <small>{bookLabel}</small>
  </div>
  )
}

export default BookshelfLabel;