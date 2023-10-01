import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Shelf {
  book: {
    id: string,
    shelf: string
  }
}

const BookshelfLabel = () => {

  const [bookLabel, setBookLabel] = useState('');
  const id = useParams();

  console.log(bookLabel);
  console.log(id);

  const handleOnChange = (label: string) => {
    axios.put<Shelf>(`/api/bookshelf/${id}/${label}`)
        .then((response) => {
          setBookLabel(response.data.book.shelf);
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