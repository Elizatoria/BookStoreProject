import { useState, useContext, useEffect, useCallback } from "react";
import { AccessTokenContext } from "../../Contexts/AccessTokenContext";
import axios from "axios";
//import BookshelfLabel from "../BookshelfLabel/BookshelfLabel";
import { useNavigate } from "react-router-dom";

interface IBook {
  id: string;
  title: string;
  image: string;
  synopsis: string;
  shelf: string;
  [key: string]: any;
}

interface IBookResponse {
  books: {
    wantToRead: IBook[],
    currentlyReading: IBook[],
    read: IBook[]
  }
}

function Bookshelf() {
  
  const [ wantRead, setWantRead] = useState<IBook[]>([]);
  const [ currently, setCurrently] = useState<IBook[]>([]);
  const [ read, setRead] = useState<IBook[]>([]);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  //Getting access token from the Context API
  const { getToken, logout } = useContext(AccessTokenContext);

  const getBooks = useCallback(async () => {
    try {
      const response = await axios.request<IBookResponse>({
        method: "GET",
        url: "/api/bookshelf",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const books = response.data.books;
      setWantRead(books.wantToRead);
      setCurrently(books.currentlyReading);
      setRead(books.read);
    } catch (error) {
      console.error(error);
      /**
       * If the response returns an HTTP status of 401 in this case, that means that the token has expired or is invalid.
       * Ideally, we would want to refresh the JWT token
       * but we need to be careful to get into a never ending loop.
       */
      setErrorMessage("Oh no! An unexpected error occurred.");
    }
  }, [getToken]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const [bookLabel, setBookLabel] = useState('');

  const handleOnChange = (id: string, label: string) => {
    try {
      axios.request<IBook>({
       method: "PUT",
       url: `/api/bookshelf/${id}/${label}`,
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

      useEffect(() => {
        getBooks();
      }, [getBooks, wantRead, currently, read]);

      type DeleteBookResponse = '';

      async function deleteFromList(indexToDelete: string) {
        try {
          const { data } = await axios.delete<DeleteBookResponse>(
            `/api/bookshelf/${indexToDelete}`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            },
          );
          return data;

        }     
        catch (error) {
        console.error(error);}
      }

      useEffect(() => {
        getBooks();
      }, [getBooks, wantRead, currently, read]);

  return (
    <div className="container mt-2 mb-5">
      <div className="d-flex justify-content-between">
      <button
          type="button"
          className="btn btn-primary mb-2 button-84"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>

      <div><h1>My Bookshelf</h1></div>

      <h2>Want To Read</h2>
      {wantRead.map((book) => {
        const key = `book-${book.id}`;
        const name = `${book.title}`;
        const image = `${book.imageLinks.thumbnail}`;
        return (
          <div key={key} className="shelf">
            <img src={image} alt='Book Details Button' onClick={() => {navigate(`/book/${book.id}`)}} />
            
            <div className='labels'>
            <h3>{name}</h3>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => handleOnChange(`${book.id}`, event.target.value)}
    >
      <option value="">Pick A Shelf</option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <div><button className="button-1" onClick={() => deleteFromList(`${book.id}`)}><b>Delete Book</b></button></div>
  </div>
          </div>
        );
      })}

      <h2>Currently Reading</h2>
      {currently.map((book) => {
        const key = `book-${book.id}`;
        const name = `${book.title}`;
        const image = `${book.imageLinks.thumbnail}`;
        return (
          <div key={key} className="shelf">
            <img src={image} alt='Book Details Button' onClick={() => {navigate(`/book/${book.id}`)}} />
            
            <div className='labels'>
            <h3>{name}</h3>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => handleOnChange(`${book.id}`, event.target.value)}
    >
      <option value="">Pick A Shelf</option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <div><button className="button-1" onClick={() => deleteFromList(`${book.id}`)}><b>Delete Book</b></button></div>
  </div>
          </div>
        );
      })}

      <h2>Read</h2>
      {read.map((book) => {
        const key = `book-${book.id}`;
        const name = `${book.title}`;
        const image = `${book.imageLinks.thumbnail}`;
        return (
          <div key={key} className="shelf">
            <img src={image} alt='Book Details Button' onClick={() => {navigate(`/book/${book.id}`)}} />
            
            <div className='labels'>
            <h3>{name}</h3>
    <label htmlFor="rank">Change Bookshelf:</label>
    <select
      value={bookLabel}
      onChange={event => handleOnChange(`${book.id}`, event.target.value)}
    >
      <option value="">Pick A Shelf</option>
      <option value="wantToRead">Want To Read</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="read">Read</option>
    </select>
    <div><button className="button-1" onClick={() => deleteFromList(`${book.id}`)}><b>Delete Book</b></button></div>
  </div>
          </div>
        );
      })}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Bookshelf;