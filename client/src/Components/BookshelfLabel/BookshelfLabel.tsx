import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AccessTokenContext } from "../../Contexts/AccessTokenContext";

interface Shelf {
  book: {
    id: string,
    shelf: string
  }
}

const BookshelfLabel = () => {

  const [bookLabel, setBookLabel] = useState('');
  const id = useParams();
  const {getToken} = useContext(AccessTokenContext);

  console.log(bookLabel);
  console.log(id);

  const handleOnChange = (label: string) => {
    console.log(label);
    console.log(id);
    try {
      axios.request<Shelf>({
       method: "PUT",
       url: `/api/bookshelf/${id}/${label}`,
       headers: {
         Authorization: `Bearer ${getToken()}`,
       },
      })
        .then((response) => {
          setBookLabel(response.data.book.shelf);
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