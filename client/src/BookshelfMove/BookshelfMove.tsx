import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AccessTokenContext } from '../Contexts/AccessTokenContext';

interface Shelf {
  books: {
    id: string,
    shelf: string
  }
}

const BookshelfMove = () => {

  const [bookLabel, setBookLabel] = useState('');
  const key = useParams();
  const {getToken} = useContext(AccessTokenContext);

  const handleOnChange = (label: string) => {
    console.log(label);
    console.log(key);
    try {
      axios.request<Shelf>({
       method: "PUT",
       url: `/api/bookshelf/${key.id}/${label}`,
       headers: {
         Authorization: `Bearer ${getToken()}`,
       },
      })
        .then((response) => {
          console.log(response.data.books.shelf);
          setBookLabel(response.data.books.shelf);
        })
    }
    catch (error) {
      console.error(error);} }

  return (
    <div>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => handleOnChange(event.target.value)}
    >
      <option value="">Choose Shelf</option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <small>{bookLabel}</small>
  </div>
  )
}

export default BookshelfMove;