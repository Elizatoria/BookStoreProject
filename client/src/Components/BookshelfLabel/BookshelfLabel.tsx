import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AccessTokenContext } from "../../Contexts/AccessTokenContext";

interface Shelf {
  books: {
    id: string,
    shelf: string
  }
}

//axios call to add book to bookshelf
const BookshelfLabel = () => {

  const [bookLabel, setBookLabel] = useState('');
  const id = useParams();
  const {getToken} = useContext(AccessTokenContext);

  const handleOnChange = (label: string) => {
    try {
      axios.request<Shelf>({
       method: "PUT",
       url: `/api/bookshelf/${id.id}/${label}`,
       headers: {
         Authorization: `Bearer ${getToken()}`,
       },
      })
        .then((response) => {
          setBookLabel(response.data.books.shelf);
        })
    }
    catch (error) {
      console.error(error);} }

      //displays the select menu in BookDetails
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
  </div>
  )
}

export default BookshelfLabel;