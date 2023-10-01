import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AccessTokenContext } from "../../Contexts/AccessTokenContext";

interface BookType {
  title: string,
  imageLinks: {
    thumbnail: string
  }
  description: string,
  authors: string,
  publishedDate: string,
  publisher: string,
  categories: string
}

interface Shelf {
  book: {
    id: string,
    shelf: string
  }
}

const BookDetails = () => {
  const [book, setBook] = useState<BookType>();

  const {id} = useParams();

  const {getToken} = useContext(AccessTokenContext);

  useEffect(() => {
    axios.get(`/api/book/${id}`)
    .then((res) => {
      setBook(res.data.book);
    })
    .catch((err) => {console.log(err)})
  }, [id])

  const image = `${book?.imageLinks.thumbnail}`;

  const [bookLabel, setBookLabel] = useState('');

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
      <div className='titleImage'>
        <h2>{book?.title}</h2>
        <img src={image} alt='Book' />
      </div>
      <div className='details'>
        <h2>Description</h2>
        <p>{book?.description}</p>
        <h2>Authors</h2>
        <p>{book?.authors}</p>
        <h2>Published Date</h2>
        <p>{book?.publishedDate}</p>
        <h2>Publisher</h2>
        <p>{book?.publisher}</p>
        <h2>Categories</h2>
        <p>{book?.categories}</p>
      </div>
      <div className='labels'>
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
    </div>
  )
}

export default BookDetails;