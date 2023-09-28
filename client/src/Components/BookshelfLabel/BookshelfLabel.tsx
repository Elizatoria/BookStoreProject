import { useState, useEffect } from 'react';
import axios from 'axios';

interface Shelf {
  book: {
    id: string,
    shelf: string
  }
}

const BookshelfLabel = () => {

  const [bookLabel, setBookLabel] = useState<Shelf>();
  const [id, setId] = useState("");

  useEffect(() => {
    axios.put(`/api/bookshelf/${id}/${bookLabel}`)
        .then((response) => {
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
      <option value="none">None</option>
    </select>
    <small>{bookLabel}</small>
  </div>
  )
}

export default BookshelfLabel;