import { useState, useEffect } from 'react';
import axios from 'axios';

interface Shelf {
  book: {
    id: string,
    shelf: string
  }
}

const BookshelfLabel = () => {

  const [bookLabel, setBookLabel] = useState('');
  const [id, setId] = useState("");

  console.log(bookLabel);

  const handleOnChange= (label: string) => {
    axios.put(`/api/bookshelf/${id}/${bookLabel}`)
        .then((response) => {
            console.log(response.data);
        })
}

  return (
    <div>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => handleOnChange(event.target.value)}
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