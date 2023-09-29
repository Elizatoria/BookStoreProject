import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Shelf {
  book: {
    id: string,
    shelf: string
  }
}

const BookshelfLabel = () => {

  const [bookLabel, setBookLabel] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  console.log(bookLabel);
  console.log(id);

  const handleOnChange= (label: string) => {
    axios.put(`/api/bookshelf/${id}/${bookLabel}`)
        .then((response) => {
          setBookLabel(response.data.book);
          navigate(`/bookshelf/${id}/${bookLabel}`)
            console.log(response.data.book);
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